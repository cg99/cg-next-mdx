import React, { useRef } from 'react'
import Image from 'next/image';
import axios from 'axios';

const ImageInput = ({ post, setPost, handleBlur }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Featured Image</label>

            {post.featuredImage ?
                <div className='block'>
                    <div>
                        <Image src={`/uploads/${post.featuredImage}`}
                            width={300} height={250}
                            alt="Featured Image"
                        />
                    </div>
                    <button className="px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                        onClick={() => setPost({
                            ...post,
                            featuredImage: null
                        })}
                    >Remove</button>
                </div> :
                (<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <label
                                htmlFor="featuredImage"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                                <span onClick={() => fileInputRef.current && fileInputRef.current.click()}>Upload a file</span>
                                <input
                                    ref={fileInputRef}
                                    className='sr-only'
                                    type="file"
                                    // name="featuredImage"
                                    onChange={async (event) => {
                                        let file = event.target.files![0];
                                        // setFeaturedImage({ file });
                                        // setFieldValue('featuredImage', file);

                                        let fd = new FormData()
                                        fd.append('image', file)

                                        // console.log('file being uploaded', fd);

                                        await axios.post('/api/posts/images', fd)
                                            .then(res => {
                                                const fileName = res.data.filename;
                                                setPost({
                                                    ...post,
                                                    featuredImage: fileName
                                                })
                                            })
                                            .catch(err => console.log(err));

                                    }}
                                    onBlur={handleBlur}
                                // value={featuredImageInput.file}
                                />     </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>)}
        </div>
    )
}

export default ImageInput
