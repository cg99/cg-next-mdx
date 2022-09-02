import axios from 'axios';
// import mongoose, { ConnectOptions } from 'mongoose';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Suspense, useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import Template from '../../components/Template';
import Post from '../../models/Post';
const DOMPurify = require('isomorphic-dompurify');
import db from '../../utils/db-page-not-used'
import { IPost } from '../../utils/interface/IPost';

const SITE_URL = 'http://localhost:3000';



const SlugPost = ({ post }) => {

    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <Template>
            <button className="rounded-full text-4xl" onClick={() => router.back()}>
                <MdArrowBack />
            </button>

            {!post ? null :
                <div className='p-6 m-2 mt-4 shadow-sm relative'>
                    <div className='w-full h-64 relative'>
                        <Image src={post?.featuredImage ? ("/uploads/" + post?.featuredImage) : '/images/placeholder.webp'}
                            layout='fill'
                            objectFit='contain'
                            alt={post?.title}
                            priority
                        />
                    </div>

                    {/* <h3 className='text-md text-blue-700 my-2'>{post?.category}</h3> */}

                    <h2 className='text-2xl font-bold'>{post?.title}</h2>

                    <div className='text-slate-500 my-2'>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.content) }} />
                    </div>

                    <div>
                        <div className="author">codegenius</div>
                        <div className='text-slate-500'>
                            {new Date(post?.createdAt).toLocaleDateString('en-AU', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                </div>
            }
        </Template >
    )
}

export const getStaticPaths: GetStaticPaths = async () => { // get all posts

    const posts = await axios.get(SITE_URL + '/api/posts/')
        .then(res => res.data?.posts)
        .catch(err => console.log(err));

    const paths = posts ? posts.map(post => ({
        params: {
            slug: post?.slug,
        }
    })) : [];

    return {
        paths,
        fallback: false,
    }
}

interface IParams extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug: postSlug } = context.params as IParams;
    // const postSlug = params?.slug;

    if (postSlug) {
        const post = await axios.get(SITE_URL + '/api/posts/slug/' + postSlug)
            .then(res => res.data?.post)
            .catch(err => console.log(err));

        return {
            props: {
                post: post ? post[0] : null
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

export default SlugPost