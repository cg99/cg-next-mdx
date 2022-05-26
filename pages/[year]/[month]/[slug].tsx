import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'
import Image from 'next/image'
const DOMPurify = require('isomorphic-dompurify');

const router = useRouter();
const { month, year, slug } = router?.query

const Post = ({ post }) => {

    return (
        <>
            <h1>Post: {month}</h1><h1>Comment: {year}</h1>
            <div className='p-6 m-2 mt-4 rounded-lg shadow-lg hover:shadow-gray-400 relative'>
                <a href="#">
                    <div className='w-full h-48 relative'>
                        <Image src={post?.featuredImage ? ("/uploads/" + post?.featuredImage) : '/images/placeholder.webp'}
                            layout='fill'
                            objectFit='cover'
                            alt={post.title}
                            priority
                        />
                    </div>

                    <h3 className='text-md text-blue-700 my-2'>{post?.category}</h3>

                    <h2 className='text-2xl font-bold'>{post.title}</h2>

                    <div className='text-slate-500 my-2'>
                        {DOMPurify.sanitize(post?.content)}
                    </div>

                    <div>
                        <div className="author">codegenius</div>
                        <div className='text-slate-500'>
                            {post?.createdAt}
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await axios.get('/api/posts');
    const posts = await res.data.posts

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
        params: {
            year: post.createdAt.substring(0, 4),
            month: post.createdAt.substring(5, 7),
            slug: post.slug,
        },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `year` `month` `slug`.
    // If the route is like /posts/2022/03/this-is-the-title-slug, then params.year is 2022
    const res = await axios.get(`/api/posts/?slug=${params.slug}`);

    const post = await res.data.post;

    // Pass post data to the page via props
    return { props: { post } }
}

export default Post