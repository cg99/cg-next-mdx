// page for dashboard category list 
import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useSWRConfig } from 'swr';
import { usePosts } from '../../../utils/swr/usePosts';

const Page = ({ index, limit }) => {
    const { mutate } = useSWRConfig()

    const url = `/api/categories?page=${index}&limit=${limit}`; // get categories api
    const { data, isError, isLoading } = usePosts(url);

    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    // const categories = data;

    const deletePostFn = async (id: number | string) => { // delete the category
        await axios.delete(`/api/categories/?id=${id}`);
    }
    const handleDelete = (id: number | string) => {
        if (confirm("Are you sure you want to delete this category?") !== true) return;

        const newData = data.categories?.filter(category => category._id !== id); // for immediately updating the categories list on ui after delete is clicked with optimisticData

        const options = { optimisticData: newData, rollbackOnError: true };
        mutate('/api/categories', deletePostFn(id), options);
    }

    return (
        <div className='flex flex-wrap'>
            {data?.categories?.map((category) => (
                <div key={category._id} className='w-full my-2 p-4 border border-solid hover:border-dotted border-slate-200'>
                    <div className="flex">
                        <Link href={`/dashboard/categories/edit?id=${category._id}`}>
                            <a className='block w-full h-full'>
                                {category.title}
                            </a>
                        </Link>
                        <button className='text-red-500' onClick={() => handleDelete(Number(category._id))}>
                            <RiDeleteBin2Line />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Page