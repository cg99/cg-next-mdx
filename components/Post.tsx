import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Post = ({ post }) => {

    return (
        <div className='p-6 m-2 mt-4 rounded-lg shadow-lg hover:shadow-gray-400 relative'>
            <Link href={`/posts/${post.slug}`}>
                <div className='hover:cursor-pointer'>
                    <div className='w-full h-56 relative'>
                        <Image src={post?.featuredImage ? ("/uploads/" + post?.featuredImage) : '/images/placeholder.webp'}
                            layout='fill'
                            objectFit='cover'
                            alt={post.title}
                            priority
                        />
                    </div>

                    <h3 className='text-md text-blue-700 my-2'>{post?.categories[0]?.label}</h3>

                    <h2 className='text-2xl font-bold hover:text-red-500'>{post.title}</h2>

                    {/* <div className='text-slate-500 my-2'>
                        <div dangerouslySetInnerHTML={{ __html: (post?.content).replace(/<img .*?>/g, "").substr(0, 150) }}></div>
                    </div> */}

                    <div>
                        {/* <div className="author">codegenius</div> */}
                        <div className='text-slate-500'>
                            {new Date(post?.createdAt).toLocaleDateString('en-AU', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default Post