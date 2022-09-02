// fronted wrapper
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'
import { IPost } from '../utils/interface/IPost'
import { fetcher } from '../utils/swr/fetcher'

export default function Template({ children, searchValue, setSearchValue }) {

    return (
        <>
            <Head>
                <title>Codegenes</title>
                <meta name="description" content="unique projects with source code" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Logo />

            <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />

            <main className='mx-20 my-5'>
                {children}
            </main >

            {/* <Footer /> */}
        </>
    )
}