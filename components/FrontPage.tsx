import axios from 'axios';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react'
import { IPost } from '../utils/interface/IPost';
import { fetcher } from '../utils/swr/fetcher';
import Post from './Post'
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 3;

const FrontPage: NextPage = () => {
    const [limit, setLimit] = useState(5);

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        (index) =>
            `/api/posts?page=${index + 1}&limit=${limit}`,
        fetcher
    );

    const postsData: any = data ? [].concat(...data) : [];

    const isLoadingInitialData = !data && !error;

    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined");

    const isEmpty = data?.[0]?.length === 0;

    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    const isRefreshing = isValidating && data && data.length === size;


    const [posts, setPosts] = useState<IPost[] | null>(null);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(postsData);

        setPosts(postsData.posts);
    }, [postsData]);

    return (
        <div className='container mx-auto'>
            <p>
                showing {size} page(s) of {isLoadingMore ? "..." : postsData.length}{" "}
                issue(s){" "}
                <button className='button-rounded bg-purple-500 px-4 py-2 mx-2'
                    onClick={() => {
                        // setRepo(val);
                        setSize(1);
                    }}
                >
                    load posts
                </button>
                <button className='button-rounded bg-blue-500 px-4 py-2 mx-2'
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => setSize(size + 1)}
                >
                    {isLoadingMore
                        ? "loading..."
                        : isReachingEnd
                            ? "no more issues"
                            : "load more"}
                </button>
                <button className='button-rounded bg-green-500 px-4 py-2 mx-2'
                    disabled={isRefreshing} onClick={() => mutate()}>
                    {isRefreshing ? "refreshing..." : "refresh"}
                </button>
                <button className='button-rounded bg-indigo-500 px-4 py-2 mx-2'
                    disabled={!size} onClick={() => setSize(0)}>
                    clear
                </button>
            </p>
            {isEmpty ? <p>Yay, no issues found.</p> : null}

            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                {posts?.map(post =>
                    <Post key={post?._id} post={post} />
                )}
            </div>
        </div>
    )
}

export default FrontPage