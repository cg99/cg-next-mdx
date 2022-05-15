import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'
import FrontPage from '../components/FrontPage'
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Codegenes</title>
        <meta name="description" content="unique projects with source code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logo />
      <Navbar />

      <FrontPage />

      <Footer />
    </div>
  )
}

export default Home
