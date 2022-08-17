// page for dashboard post list 
import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useSWRConfig } from 'swr';
import { usePosts } from '../../../utils/swr/usePosts';

const Page = ({ index, limit }) => {
    const { mutate } = useSWRConfig()

    const url = `/api/posts?page=${index}&limit=${limit}`; // get posts api
    const { data, isError, isLoading } = usePosts(url);

    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    // const posts = data;

    const deletePostFn = async (id: number | string) => { // delete the post
        await axios.delete(`/api/posts/?id=${id}`);
    }
    const handleDelete = (id: number | string) => {
        if (confirm("Are you sure you want to delete this post?") !== true) return;

        const newData = data.posts?.filter(post => post._id !== id); // for immediately updating the posts list on ui after delete is clicked with optimisticData

        const options = { optimisticData: newData, rollbackOnError: true };
        mutate('/api/posts', deletePostFn(id), options);
    }

    return (
        <div className='flex flex-wrap'>
            {data.posts?.map((post) => (
                <div key={post._id} className='w-full my-2 p-4 border border-solid hover:border-dotted border-slate-200'>
                    <div className="flex">
                        <Link href={`/dashboard/posts/edit?id=${post._id}`}>
                            <a className='block w-full h-full'>
                                {post.title}
                            </a>
                        </Link>
                        <button className='text-red-500' onClick={() => handleDelete(post._id)}>
                            <RiDeleteBin2Line />
                        </button>
                    </div>
                    {post?.createdAt && <div className='block text-xs text-slate-400'>Posted on: {new Date(post?.createdAt).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}</div>}
                </div>
            ))}
        </div>
    )
}

export default Page