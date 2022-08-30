// https://www.ibrahima-ndaw.com/blog/data-fetching-in-nextjs-using-useswr/

import axios from "axios";
import useSWRInfinite from "swr/infinite"

const fetcher = (url) => axios.get(url).then((res) => res.data).then(data => data.success ? data.posts : []);
const baseUrl = "/api"

export const usePaginatePosts = path => {
    if (!path) {
        throw new Error("Path is required")
    }

    const url = baseUrl + path;
    const PAGE_LIMIT = 6;

    const { data, error, size, setSize } = useSWRInfinite(
        index => `${url}?page=${index + 1}&limit=${PAGE_LIMIT}`,
        fetcher
    )

    const posts = data ? [].concat(...data) : []
    const isLoadingInitialData = !data && !error
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined")
    const isEmpty = data?.[0]?.length === 0
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT)

    return { posts, error, isLoadingMore, size, setSize, isReachingEnd }
}