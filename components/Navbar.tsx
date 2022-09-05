import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';
// import { AppContext } from '../context/AppContext';
import { ICategory } from '../utils/interface/ICategory';
import { IPost } from '../utils/interface/IPost';
// import { fetcher } from '../utils/swr/fetcher';

const Navbar = () => {

    const [categories, setCategories] = useState<ICategory[] | null>(null);

    useEffect(() => { // get caategories
        (async () => {
            const res = await axios.get('/api/categories');
            setCategories(res.data.categories);
        })();
    }, []);

    // search
    const [searchResult, setSearchResult] = useState([]);

    // useEffect(() => {
    //     if (value !== '') {
    //         axios.get('/api/posts', {
    //             params: {
    //                 q: value
    //             }
    //         }).then(res => {
    //             if (res.data) {
    //                 setSearchResult(res.data?.posts);
    //                 console.log(searchResult);
    //             }
    //         }).catch(e => console.log(e));
    //     }
    // }, [state])


    return (
        <div className='bg-blue-800 px-16 flex justify-between'>
            <ul className='flex text-slate-50'>
                {categories?.slice(0, 8).map(category => (
                    <li className='px-4 py-4 hover:bg-blue-900' key={category?._id}>
                        <Link href={`/category/${category?.slug}`}>
                            <a>{category?.title}</a>
                        </Link>
                    </li>
                ))}

            </ul>

            {/* <div className="flex rounded-md shadow-sm justify-center relative">
                <input
                    id='searchPost'
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-sm mx-auto my-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    placeholder={`search for a post`}
                    type='search'
                    name='search_post'
                    onChange={(e) => {
                        // console.log(e.target.value);
                        // setState(state => ({ ...state, searchValue: e.target.value }));
                    }}
                />

                <div className="search-results absolute top-16 bg-gray-100 z-10 p-5">
                    <ul>
                        {searchResult?.map((post: IPost) => (
                            <li key={post?._id}>{post?.title}</li>
                        ))}
                    </ul>
                </div>
            </div> */}
        </div>
    )
}

export default Navbar