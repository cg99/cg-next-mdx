// fronted wrapper
import Head from 'next/head'
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'
import Footer from './Footer'
import { HiMenuAlt4 } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'

import { useState } from 'react'


export default function Template({ children }) {
    const [mobileMenuHidden, setMobileMenuHidden] = useState(true);

    return (
        <>
            <Head>
                <title>Codegenes</title>
            </Head>

            <header className='flex justify-center items-center p-0 md:block h-20 md:h-auto'>
                <Logo />

                <button onClick={() => setMobileMenuHidden(!mobileMenuHidden)} className='flex bg-transparent items-center md:hidden'>
                    {mobileMenuHidden ? <HiMenuAlt4 /> : <MdClose />}
                </button>

            </header>

            <Navbar mobileMenuHidden={mobileMenuHidden} setMobileMenuHidden={setMobileMenuHidden} />

            <main className='mx-2 sm:mx-4 md:mx-20 my-5 h-full overflow-hidden'>
                {children}
            </main >

            <Footer />

        </>
    )
}