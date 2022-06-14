import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri';
import Layout from '../../../components/dashboard/Layout'
import { ICategory } from '../../../utils/interface/ICategory';

const index = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/categories');
            console.log(res.data);
            setCategories(res.data.categories);
            setLoading(false);
        })();
    }, []);

    const deleteCategory = async (id: number) => {
        await axios.delete(`/api/categories/?id=${id}`);
        setCategories(categories.filter(category => category._id !== id));
    }

    return (
        <Layout>
            <div className="flex justify-between">
                <h1>All Categories</h1>
                <div className='my-2'>
                    <Link href="/dashboard/categories/create">
                        <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Add Category</button>
                    </Link>
                </div>
            </div>

            {loading ? <div>loading...</div> : (
                <div className='flex flex-wrap'>
                    {categories?.map((category) => (
                        <div key={category._id} className='w-full my-2 p-4 border border-solid hover:border-dotted border-slate-200'>
                            <div className="flex">
                                <Link href={`/dashboard/categories/edit?id=${category._id}`}>
                                    <a className='block w-full h-full'>
                                        {category.title}
                                    </a>
                                </Link>
                                <button className='text-red-500' onClick={() => deleteCategory(category._id)}>
                                    <RiDeleteBin2Line />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    )
}

export default index