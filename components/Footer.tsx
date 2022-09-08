import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className='px-16 text-white bg-gray-800 py-4'>
            <div className="flex justify-between">
                <div>codegenes &#169; 2022</div>
                <div>
                    <Link href="/privacy-policy">
                        <a className='text-white'>Privacy</a>
                    </Link>
                    <Link href="/about">
                        <a className='text-white ml-4'>About</a>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer