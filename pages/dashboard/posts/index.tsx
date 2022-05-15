import React from 'react'
import Sidebar from '../../../components/dashboard/Sidebar';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { IPost } from '../../../utils/interface/IPost';

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
    }, []);

    return (
        <div className='flex columns-2 h-full'>
            <Sidebar />
            <main className='m-4'>
                <h1>posts</h1>

                {loading ? <div>loading...</div> : (
                    <div className='flex flex-wrap'>
                        {posts.map(post => (
                            <div key={post._id} className='w-1/2 m-2'>
                                <Link href={`/dashboard/posts/edit?id=${post._id}`}>
                                    <a className='block w-full h-full'>
                                        {post.title}
                                        {/* <img src={post.image} className='w-full h-full' /> */}
                                    </a>
                                </Link>
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