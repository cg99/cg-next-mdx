import React, { useContext } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { ThemeContext } from '../context/theme';

const Footer = () => {
    return (
        <footer className="px-4 md:px-16 bg-slate-200 dark:bg-slate-900 py-4 text-slate-600 mt-20">
            <div className="flex justify-between">
                <div>codegenes &#169; 2022</div>
                <div>
                    <Link href="/privacy-policy">
                        <a className='text-slate-600 hover:text-slate-900 hover:dark:text-slate-200'>Privacy</a>
                    </Link>
                    <Link href="/about">
                        <a className='text-slate-600 hover:text-slate-900 hover:dark:text-slate-200 ml-4'>About</a>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer