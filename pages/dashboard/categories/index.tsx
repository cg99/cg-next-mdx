import Link from 'next/link';
import { useState } from 'react';
import CategoryPage from '../../../components/dashboard/categories/CategoryPage';
import Layout from '../../../components/dashboard/Layout';


const index = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const [limit, setLimit] = useState(5);

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

            <CategoryPage index={pageIndex} limit={limit} />
            {/* prefetch the next page */}
            <div style={{ display: 'none' }}><CategoryPage index={pageIndex + 1} limit={limit} /></div>

            {/* if page index is 1 don't show previous button */}
            {pageIndex <= 1 ? null : <button className="rounded-none bg-gray-500 text-white px-4 py-2 mr-5" onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>}

            <button className="rounded-none bg-gray-500 text-white px-4 py-2" onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        </Layout>
    )
}

export default index