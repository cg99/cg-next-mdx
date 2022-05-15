import React from 'react'
import Blog from './Blog'

const FrontPage = () => {
    return (
        <main className='mx-20 my-5'>
            <div className="flex">
                <Blog />
                <Blog />
                <Blog />
            </div>
        </main>
    )
}

export default FrontPage