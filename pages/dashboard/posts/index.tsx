import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../../components/dashboard/Layout';
import Page from '../../../components/dashboard/posts/Page';


const Posts = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const [limit, setLimit] = useState(5);

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

            <Page index={pageIndex} limit={limit} />
            {/* prefetch the next page */}
            <div style={{ display: 'none' }}><Page index={pageIndex + 1} limit={limit} /></div>
            <button className="rounded-none bg-gray-500 text-white px-4 py-2" onClick={() => setPageIndex(pageIndex <= 0 ? 1 : (pageIndex - 1))}>Previous</button>
            <button className="rounded-none bg-gray-500 text-white ml-5 px-4 py-2" onClick={() => setPageIndex(pageIndex + 1)}>Next</button>

        </Layout>
    )
}

export default Posts