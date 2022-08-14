import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'
import { MdOutlineAccountCircle, MdOutlineCategory, MdOutlineEditNote, MdSpaceDashboard } from 'react-icons/md'
import styles from '../../styles/Dashboard.module.css';


const Sidebar = () => {
    return (
        <div className={`bg-slate-900 text-slate-50 h-full ${styles.sidebar}`}>
            <div className='w-full h-10 bg-rose-300'>
                <Link href="/">
                    <a className="flex justify-center items-center h-full w-full px-4 relative">
                        <Image src="/images/logo-stripe.png"
                            objectFit='contain'
                            width={150}
                            height={30}
                            className='invert-2'
                            priority
                        />
                    </a>
                </Link>
            </div>
            <div className='h-full mt-4 mx-12'>
                <div className='my-2'>
                    <Link href="/dashboard">
                        <a className='flex items-center'>
                            <MdSpaceDashboard /> <span className='pl-2 pb-0.5'>Dashboard</span>
                        </a>
                    </Link>
                </div>
                <div className='my-2'>
                    <Link href="/dashboard/posts">
                        <a className='flex items-center'>
                            <MdOutlineEditNote /> <span className='pl-2 pb-0.5'>Posts</span>
                        </a>
                    </Link>
                </div>
                <div className='my-2'>
                    <Link href="/dashboard/categories">
                        <a className='flex items-center'>
                            <MdOutlineCategory /> <span className='pl-2 pb-0.5'>Categories</span>
                        </a>
                    </Link>
                </div>
                <div className='my-2'>
                    <Link href="/dashboard/profile">
                        <a className='flex items-center'>
                            <MdOutlineAccountCircle /> <span className='pl-2 pb-0.5'>Profile</span>
                        </a>
                    </Link>
                </div>
                <div className='my-2'>
                    <Link href="/dashboard/menu">
                        <a className='flex items-center'>
                            <MdOutlineAccountCircle /> <span className='pl-2 pb-0.5'>Menu</span>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar; 