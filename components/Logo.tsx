import React from 'react'
import Image from 'next/image'
const Logo = () => {
    return (
        <div className='flex items-center my-10 mx-20'>
            <a href="https://codegenes.net" className='grid content-center'>
                <Image src="/images/logo.png" width={250} height={50} />
            </a>
            <div className="text-lg text-slate-600 ml-10">
                unique projects with source code
            </div>
        </div>
    )
}

export default Logo