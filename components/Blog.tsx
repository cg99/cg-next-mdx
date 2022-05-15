import React from 'react'
import Image from 'next/image'

const Blog = () => {
    return (
        <div className='p-6 m-2 rounded-lg shadow-lg hover:shadow-gray-400'>
            <a href="#">
                <Image src="/vercel.svg" width={100} height={100} />

                <h3 className='text-md text-blue-700 my-2'>Category</h3>

                <h2 className='text-2xl font-bold'>The title of the post</h2>

                <p className='text-slate-500 my-2'>
                    Registration can be helpful in many ways such as registering a new user, survey and so on. This project is an online registration system using PHP and MySQL.
                </p>

                <div>
                    <div className="author">codegenius</div>
                    <div className='text-slate-500'>
                        December 8, 2021
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Blog