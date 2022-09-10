import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Post = ({ post }) => {

    return (
        <div className='bg-white dark:bg-slate-900 dark:hover:shadow-black p-6 m-2 mt-4 rounded-lg shadow-lg hover:shadow-slate-400 relative'>
            <Link href={`/blog/${post.slug}`}>
                <div className='hover:cursor-pointer'>
                    <div className='w-full h-56 relative'>
                        <Image src={post.frontmatter?.cover_image ? post.frontmatter.cover_image : '/images/placeholder.webp'}
                            layout='fill'
                            objectFit='cover'
                            alt={post.title}
                            priority
                        />
                    </div>

                    <h3 className='text-md text-blue-700 my-2'>{post.frontmatter?.categories}</h3>

                    <h2 className='text-2xl font-bold text-slate-700 hover:text-slate-600 dark:text-slate-300 hover:dark:text-slate-400'>{post.frontmatter.title}</h2>

                    {/* <div className='text-slate-500 my-2'>
                        {post.frontmatter.excerpt}
                    </div> */}

                    <div>
                        {/* <div className="author">codegenius</div> */}
                        <div className='text-slate-500'>
                            {post.frontmatter.date}
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default Post