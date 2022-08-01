import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Logo = () => {
    return (
        <div className='flex items-center my-10 mx-20'>
            <Link href="/" className='grid content-center'>
                <Image src="/images/logo.png" width={250} height={50} className="hover:cursor-pointer" />
            </Link>
            <div className="text-lg text-slate-600 ml-10">
                unique projects with source code
            </div>
        </div>
    )
}

export default Logo