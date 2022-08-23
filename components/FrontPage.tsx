import axios from 'axios';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react'
import { IPost } from '../utils/interface/IPost';
import { fetcher } from '../utils/swr/fetcher';
import Post from './Post'
import useSWRInfinite from "swr/infinite";
import { useField } from 'formik';

const PAGE_SIZE = 3;

const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `/api/posts?page=${pageIndex}&limit=5`                    // SWR key
}

const FrontPage: NextPage = () => {
    const { data, size, setSize } = useSWRInfinite(getKey, fetcher)
    if (!data) return <div>Loading</div>;

    // We can now calculate the number of all posts
    let totalPosts = 0;

    for (let i = 0; i < data.length; i++) {
        totalPosts += data[i]?.posts.length;
    }

    console.log('data', data);

    return (
        <div className='container mx-auto'>

            {/* <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                <div className="bg-pink-700">
                    Pink Galaxy
                </div>
                {data?.posts?.map()}
            </div> */}

            <p>{totalPosts} users listed</p>
            {data.map((postsData, index) => {
                console.log(postsData);
                // `data` is an array of each page's API response.
                return postsData?.posts.map(post => <Post key={post?._id} post={post} />)
            })}
            <button onClick={() => setSize(size + 1)}>Load More</button>
        </div>
    )
}

export default FrontPage