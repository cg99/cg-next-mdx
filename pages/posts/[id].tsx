import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import { IPost } from '../../utils/interface/IPost';
const DOMPurify = require('isomorphic-dompurify');
import { GetStaticPaths, GetStaticProps } from 'next'
import Post from '../../models/Post';
import connectDB from '../../utils/db';
import mongoose, { ConnectOptions } from 'mongoose';
import Layout from '../../components/dashboard/Layout';
import Template from '../../components/Template';


const SinglePost = ({ post }) => {

    const parsedPost = JSON.parse(post);

    return (
        <Template>
            <h1>Post</h1>
            <Suspense fallback={<div>Loading</div>}>
                <div className='p-6 m-2 mt-4 rounded-lg shadow-lg hover:shadow-gray-400 relative'>
                    <div className='w-full h-48 relative'>
                        <Image src={parsedPost?.featuredImage ? ("/uploads/" + parsedPost?.featuredImage) : '/images/placeholder.webp'}
                            layout='fill'
                            objectFit='cover'
                            alt={parsedPost?.title}
                            priority
                        />
                    </div>

                    <h3 className='text-md text-blue-700 my-2'>{parsedPost?.category}</h3>

                    <h2 className='text-2xl font-bold'>{parsedPost?.title}</h2>

                    <div className='text-slate-500 my-2'>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parsedPost?.content) }} />
                    </div>

                    <div>
                        <div className="author">codegenius</div>
                        <div className='text-slate-500'>
                            {parsedPost?.createdAt}
                        </div>
                    </div>
                </div>
            </Suspense>
        </Template>
    )
}

export async function getStaticPaths() {

    // Use new db connection
    await mongoose
        .connect(process.env.MONGO_URI!, {
            // useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
            // useNewUrlParser: true,
        } as ConnectOptions)
        .then((res) => {
            console.log(
                "Connected to Mongodb"
            );
        })
        .catch((err) => {
            console.log(
                `Connection error occured -`,
                err
            );
        });

    if (!mongoose.connections[0].readyState) {
        // Use new db connection
        await mongoose
            .connect(process.env.MONGO_URI!, {
                // useUnifiedTopology: true,
                // useFindAndModify: false,
                // useCreateIndex: true,
                // useNewUrlParser: true,
            } as ConnectOptions)
            .then((res) => {
                console.log(
                    "Connected to Distribution API Database - Initial Connection"
                );
            })
            .catch((err) => {
                console.log(
                    `Initial Distribution API Database connection error occured -`,
                    err
                );
            });
    }

    const posts = await Post.find();

    mongoose.disconnect();

    const paths = posts ? posts.map(post => ({
        params: {
            id: post?._id.toString(),
        }
    })) : [];

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postId = params?.id;

    console.log(postId);

    if (postId !== null) {

        if (!mongoose.connections[0].readyState) {
            // Use new db connection
            await mongoose
                .connect(process.env.MONGO_URI!, {
                    // useUnifiedTopology: true,
                    // useFindAndModify: false,
                    // useCreateIndex: true,
                    // useNewUrlParser: true,
                } as ConnectOptions)
                .then((res) => {
                    console.log(
                        "Connected to Distribution API Database - Initial Connection"
                    );
                })
                .catch((err) => {
                    console.log(
                        `Initial Distribution API Database connection error occured -`,
                        err
                    );
                });
        }

        const post = await Post.findById(postId);

        mongoose.disconnect();

        return {
            props: {
                post: post ? JSON.stringify(post) : null
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