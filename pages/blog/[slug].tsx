// import mongoose, { ConnectOptions } from 'mongoose';
import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import { useRouter } from 'next/router';
import path from 'path';
import { MdArrowBack } from 'react-icons/md';
import Template from '../../components/Template';
import { marked } from 'marked';


const SlugPost = ({
    frontmatter: { title, date, cover_image, categories },
    slug,
    content,
}) => {

    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <Template>
            <button className="rounded-full text-4xl" onClick={() => router.back()}>
                <MdArrowBack />
            </button>

            {
                <article className='p-6 m-2 mt-4 shadow-sm relative'>
                    <div className='w-full h-64 relative'>
                        <Image src={cover_image ? cover_image : '/images/placeholder.webp'}
                            layout='fill'
                            objectFit='contain'
                            alt={title}
                            priority
                        />
                    </div>

                    <h2 className='text-2xl font-bold'>{title}</h2>

                    <h3 className='text-md text-blue-700 my-2'>{categories}</h3>

                    <div>
                        {/* <div className="author">codegenius</div> */}
                        <div className='text-slate-500'>
                            {date}
                        </div>
                    </div>


                    <div className='text-slate-500 my-2'>
                        <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
                    </div>
                </article>
            }
        </Template >
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace('.mdx', ''),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(
        path.join('posts', slug + '.mdx'),
        'utf-8'
    )

    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    }
}

export default SlugPost