import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IPost } from '../../utils/interface/IPost';
const DOMPurify = require('isomorphic-dompurify');
import { GetStaticPaths, GetStaticProps } from 'next'


const SinglePost = ({ post }) => {

    const [loading, setLoading] = useState(true);

    return (
        <>
            <h1>Post</h1>
            {post &&
                (<div className='p-6 m-2 mt-4 rounded-lg shadow-lg hover:shadow-gray-400 relative'>
                    <a href="#">
                        <div className='w-full h-48 relative'>
                            <Image src={post?.featuredImage ? ("/uploads/" + post?.featuredImage) : '/images/placeholder.webp'}
                                layout='fill'
                                objectFit='cover'
                                alt={post?.title}
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
                </div>)}
        </>
    )
}


export async function getStaticPaths() {
    const res = await axios.get('/api/posts')
        .then(result => result.data)
        .catch(err => console.log(err));

    console.log('fuck', res);

    const posts = res?.posts;

    const paths = posts.map(post => ({
        params: {
            id: post._id,
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postId = params?.id;

    console.log(postId);

    if (postId !== null) {
        const res = await axios.get(`/api/posts/${postId}`)
            .then(res => res.data)
            .catch(err => console.log(err));

        const post = res?.post;

        return {
            props: {
                post: post ? post : null
            }
        }
    } else {
        return {
            props: {
                post: null
            }
        }
    }
}

export default SinglePost