import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <div className='bg-blue-900 text-slate-50 p-4 h-full'>
            <h2><Link href="/"><a>CODEGENES</a></Link></h2>
            <div className='h-full mt-4'>
                <div className='my-2'>
                    <Link href="/dashboard"><a>Dashboard</a></Link>
                </div>
                <div className='my-2'>
                    <Link href="/dashboard/posts"><a>Posts</a></Link>
                </div>
                <div className='my-2'>
                    <Link href="/dashboard/categories"><a>Categories</a></Link>
                </div>
                <div className='my-2'>
                    <Link href="/dashboard/users"><a>Users</a></Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar; 