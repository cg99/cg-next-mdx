import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Post = ({ post }) => {

    return (
        <div className='p-6 m-2 mt-4 rounded-lg shadow-lg hover:shadow-gray-400 relative'>
            <Link href={`/blog/${post.slug}`}>
                <div className='hover:cursor-pointer'>
                    <div className='w-full h-56 relative'>
                        <Image src={post.frontmatter.cover_image}
                            layout='fill'
                            objectFit='cover'
                            alt={post.title}
                            priority
                        />
                    </div>

                    {/* <h3 className='text-md text-blue-700 my-2'>{post?.categories[0]?.label}</h3> */}

                    <h2 className='text-2xl font-bold hover:text-red-500'>{post.frontmatter.title}</h2>

                    <div className='text-slate-500 my-2'>
                        {/* {post.frontmatter.excerpt} */}
                    </div>

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