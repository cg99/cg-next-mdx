// fronted wrapper
import Head from 'next/head'
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'
import Footer from './Footer'


export default function Template({ children }) {

    return (
        <>
            <Head>
                <title>Codegenes</title>
            </Head>

            <Logo />

            <Navbar />

            <main className='mx-20 my-5 h-full'>
                {children}
            </main >

            <Footer />

        </>
    )
}