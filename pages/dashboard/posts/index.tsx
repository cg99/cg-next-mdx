import { Field } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../../components/dashboard/Layout';
import Page from '../../../components/dashboard/posts/Page';


const Posts = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const [limit, setLimit] = useState(5);
    const [searchKeyword, setSearchKeyword] = useState('');

    return (
        <Layout>
            <div className="flex justify-between mt-2 mb-5">
                <h1>All Posts</h1>

                <div className="flex rounded-md shadow-sm">
                    <input
                        id='searchPost'
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder={`search for a post`}
                        type='search'
                        name='search_post'
                        onChange={(e) => {
                            console.log(e.target.value);
                            setSearchKeyword(e.target.value);
                        }}
                    // value=''
                    />
                </div>
            </div>

            <Page searchKeyword={searchKeyword}
                index={pageIndex}
                limit={limit} />
            {/* prefetch the next page */}
            <div style={{ display: 'none' }}>
                <Page searchKeyword={searchKeyword}
                    index={pageIndex + 1}
                    limit={limit} />
            </div>

            <div className="flex justify-between">
                <div className="pagination">
                    {/* if page index is 1 don't show previous button */}
                    {pageIndex <= 1 ? null : <button className="rounded-none bg-gray-500 text-white px-4 py-2 mr-5" onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>}

                    <button className="rounded-none bg-gray-500 text-white px-4 py-2" onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
                </div>

                <div className='my-2'>
                    <Link href="/dashboard/posts/create">
                        <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Add Post</button>
                    </Link>
                </div>
            </div>
        </Layout >
    )
}

export default Posts