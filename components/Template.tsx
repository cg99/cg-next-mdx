// fronted wrapper
import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'
import FrontPage from '../components/FrontPage'
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'

export default function Template({ children }) {
    return (
        <>
            <Head>
                <title>Codegenes</title>
                <meta name="description" content="unique projects with source code" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Logo />
            <Navbar />

            <main className='mx-20 my-5'>
                {children}
            </main >

            <Footer />
        </>
    )
}