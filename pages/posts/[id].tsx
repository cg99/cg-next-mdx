import axios from 'axios';
import mongoose, { ConnectOptions } from 'mongoose';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Suspense, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import Template from '../../components/Template';
import Post from '../../models/Post';
const DOMPurify = require('isomorphic-dompurify');
import db from '../../utils/db-page-not-used'

const SITE_URL = 'http://localhost:3000'

const SinglePost = ({ post }) => {
    const parsedPost = JSON.parse(post);

    const router = useRouter()

    useEffect(() => {
        if (parsedPost) {
            document.title = 'Codegenes ' + parsedPost?.title;

            console.log(parsedPost?.title)
        }
    }, [])

    return (
        <Template>
            <button className="rounded-full text-4xl" onClick={() => router.back()}>
                <MdArrowBack />
            </button>

            <Suspense fallback={<div>Loading</div>}>
                <div className='p-6 m-2 mt-4 shadow-sm relative'>
                    <div className='w-full h-64 relative'>
                        <Image src={parsedPost?.featuredImage ? ("/uploads/" + parsedPost?.featuredImage) : '/images/placeholder.webp'}
                            layout='fill'
                            objectFit='contain'
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
                            {new Date(parsedPost?.createdAt).toLocaleDateString('en-AU', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                </div>
            </Suspense>
        </Template >
    )
}

export async function getStaticPaths() {
    // db();
    // Use new db connection
    // await mongoose
    //     .connect(process.env.MONGO_URI!, {
    //         // useUnifiedTopology: true,
    //         // useFindAndModify: false,
    //         // useCreateIndex: true,
    //         // useNewUrlParser: true,
    //     } as ConnectOptions)
    //     .then((res) => {
    //         console.log(
    //             "Connected to Mongodb - single post"
    //         );
    //     })
    //     .catch((err) => {
    //         console.log(
    //             `Connection error occured - single post -`,
    //             err
    //         );
    //     });

    // if (!mongoose.connections[0].readyState) {
    //     // Use new db connection
    //     await mongoose
    //         .connect(process.env.MONGO_URI!, {
    //             // useUnifiedTopology: true,
    //             // useFindAndModify: false,
    //             // useCreateIndex: true,
    //             // useNewUrlParser: true,
    //         } as ConnectOptions)
    //         .then((res) => {
    //             console.log(
    //                 "Connected to Distribution API Database - Initial Connection - (from single post)"
    //             );
    //         })
    //         .catch((err) => {
    //             console.log(
    //                 `Initial Distribution API Database connection error occured - (from single post) -`,
    //                 err
    //             );
    //         });
    // }

    const posts = await axios.get(SITE_URL + '/api/posts')
        .then(res => res.data?.posts)
        .catch(err => console.log(err));

    // const posts = await Post.find();

    // mongoose.disconnect();

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

    if (postId !== null) {

        // if (!mongoose.connections[0].readyState) {
        //     // Use new db connection
        //     await mongoose
        //         .connect(process.env.MONGO_URI!, {
        //             // useUnifiedTopology: true,
        //             // useFindAndModify: false,
        //             // useCreateIndex: true,
        //             // useNewUrlParser: true,
        //         } as ConnectOptions)
        //         .then((res) => {
        //             console.log(
        //                 "Connected to Distribution API Database - Initial Connection"
        //             );
        //         })
        //         .catch((err) => {
        //             console.log(
        //                 `Initial Distribution API Database connection error occured -`,
        //                 err
        //             );
        //         });
        // }

        // db();

        const post = await axios.get(SITE_URL + '/api/posts/' + postId)
            .then(res => res.data?.post)
            .catch(err => console.log(err));

        // const post = await Post.findById(postId);

        // mongoose.disconnect();

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