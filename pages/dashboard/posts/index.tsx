import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Layout from '../../../components/dashboard/Layout';
import { IPost } from '../../../utils/interface/IPost';

const Posts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/api/posts');
            console.log(res.data);
            setPosts(res.data.posts);
            setLoading(false);
        }
        fetchPosts();
    }, []);

    const deletePost = async (id: number) => {
        await axios.delete(`/api/posts/?id=${id}`);
        setPosts(posts.filter(post => post._id !== id));
    }

    return (
        <Layout>
            <div className="flex justify-between">
                <h1>All Posts</h1>
                <div className='my-2'>
                    <Link href="/dashboard/posts/create">
                        <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Add Post</button>
                    </Link>
                </div>
            </div>

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
        </Layout>
    )
}

export default Posts