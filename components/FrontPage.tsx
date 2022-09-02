import { NextPage } from 'next';
import { usePaginatePosts } from '../hooks/useRequests';
import { IPost } from '../utils/interface/IPost';
import Post from './Post';

const FrontPage: NextPage = (props) => {
    const {
        posts,
        error,
        isLoadingMore,
        size,
        setSize,
        isReachingEnd,
    } = usePaginatePosts("/posts")

    if (error) return <h1>Something went wrong!</h1>
    if (!posts) return <h1>Loading...</h1>

    return (
        <div className='container mx-auto text-center'>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 text-left">
                {posts.map((post: IPost) => (
                    <Post post={post} key={post?._id} />
                ))}
            </div>

            <button
                className={`rounded-b-lg ${isReachingEnd ? 'bg-gray-500' : 'bg-indigo-500'} my-10 px-4 py-2 text-white`}
                disabled={isLoadingMore || isReachingEnd}
                onClick={() => setSize(size + 1)}
            >
                {isLoadingMore
                    ? "Loading..."
                    : isReachingEnd
                        ? "No more posts"
                        : "Load more"}
            </button>
        </div>
    )
}

export default FrontPage