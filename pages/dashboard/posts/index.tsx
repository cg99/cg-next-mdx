import React from 'react'
import Sidebar from '../../../components/dashboard/Sidebar';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { IPost } from '../../../utils/interface/IPost';
import { RiDeleteBin2Line } from 'react-icons/ri';

const Posts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/api/posts');
            // console.log(res.data);
            setPosts(res.data.posts);
            setLoading(false);
        }
        fetchPosts();

        return () => {
            // clean up
        };
    }, []);

    const deletePost = async (id: number) => {
        await axios.delete(`/api/posts/?id=${id}`);
        setPosts(posts.filter(post => post._id !== id));
    }

    return (
        <div className='flex columns-2 h-full'>
            <Sidebar />
            <main className='m-4'>
                <h1>All Posts</h1>

                {loading ? <div>loading...</div> : (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post._id} className='w-full my-2 p-4 border border-solid hover:border-dotted border-slate-200'>
                                <div className="flex">
                                    <Link href={`/dashboard/posts/edit?id=${post._id}`}>
                                        <a className='block w-full h-full'>
                                            {post.title}
                                        </a>
                                    </Link>
                                    <button className='text-red-500' onClick={() => deletePost(post._id)}>
                                        <RiDeleteBin2Line />
                                    </button>
                                </div>
                                {post?.createdAt && <div className='block text-xs text-slate-400'>Posted on: {new Date(post?.createdAt).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}</div>}
                            </div>
                        ))}
                    </div>
                )}


                <div className='my-2'>
                    <Link href="/dashboard/posts/create"><button>Add Post</button></Link>
                </div>
            </main>
        </div>
    )
}

export default Posts