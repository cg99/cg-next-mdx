import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div>codegenes &#169; 2022</div>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </div>
        </footer>
    )
}

export default Footer