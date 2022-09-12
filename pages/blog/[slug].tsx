// import mongoose, { ConnectOptions } from 'mongoose';
import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import { useRouter } from 'next/router';
import path from 'path';
import { MdArrowBack } from 'react-icons/md';
import Template from '../../components/Template';
import { marked } from 'marked';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";
import remarkToc from "remark-toc";


const SlugPost = async ({
    frontmatter: { title, date, cover_image, categories },
    slug,
    source,
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

            <article id="post" className='p-6 m-2 mt-4 shadow-sm relative bg-white dark:bg-slate-700'>
                <div className='w-full h-64 relative'>
                    <Image src={cover_image ? cover_image : '/images/placeholder.webp'}
                        layout='fill'
                        objectFit='contain'
                        alt={title}
                        priority
                    />
                </div>

                <h2 className='text-2xl font-bold mt-10'>{title}</h2>

                <h3 className='text-md text-blue-700 dark:text-blue-500 my-2'>{categories}</h3>

                <div>
                    {/* <div className="author">codegenius</div> */}
                    <div className='text-slate-500'>
                        {date}
                    </div>
                </div>


                <div className='text-slate-500 dark:text-slate-200 my-2'>
                    {/* <div dangerouslySetInnerHTML={{ __html: marked(content) }} /> */}
                    {/* <MDXRemote {...(source)} /> */}
                </div>
            </article>
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

    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [
                // passing rehype plugins(in an array)
                [rehypePrism, { showLineNumbers: true }], // to pass options to plugins, put the plugin in an array, and 2nd element should be the options object
            ],
            remarkPlugins: [remarkToc], // passing remark plugins
        },
    }); // parse the MDX string, now with pulgins

    console.log(mdxSource);


    return {
        props: {
            frontmatter,
            slug,
            source: mdxSource,
        },
    }
}

export default SlugPost