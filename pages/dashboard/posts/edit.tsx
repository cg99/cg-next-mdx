import axios from 'axios';
import { Formik } from 'formik';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import "react-quill/dist/quill.snow.css";
import Layout from '../../../components/dashboard/Layout';
import Toast from '../../../components/Toast';
import { IPost } from '../../../utils/interface/IPost';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})


const EditPost = () => {

    const [uploadedFeaturedImage, setUploadedFeaturedImage] = useState(null)

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [postContent, setPostContent] = useState("");

    const [postUpdated, setPostUpdated] = useState(false);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const [post, setPost] = useState<IPost | null>(null);

    const router = useRouter();
    const postId = router.query?.id;


    useEffect(() => {
        if (postId) {
            const fetchPost = async () => {
                const res = await axios.get(`/api/posts/?id=${postId}`);
                const postData = res.data.post;
                setPost(postData);
                setUploadedFeaturedImage(postData.featuredImage);
                setPostContent(postData.content);
            }
            fetchPost();
        }
    }, [postId]);

    return (
        <Layout>

            {postUpdated && <Toast message='Post updated successfully.' type='success' />}

            {post && <Formik
                initialValues={{ title: post?.title || '', content: post?.content || '', category: post?.category || '', featuredImage: post?.featuredImage || '' }}
                validate={values => {
                    const errors: any = {};
                    if (!values.title) {
                        errors.title = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {

                    const bodyContent = { ...values, content: postContent, featuredImage: uploadedFeaturedImage }
                    await axios.post('/api/posts/?id=' + postId, bodyContent)
                        .then(res => {
                            if (res.data.success === true) {
                                setPostUpdated(true)
                            } else {
                                console.error('error', res.data)
                            }
                        })
                        .catch(err => console.log(err));

                    setSubmitting(false);

                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                    /* and other goodies */
                }) => (

                    <>
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Post</h3>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form onSubmit={handleSubmit} method="POST">
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                        {/* post title */}
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                    Post Title
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        id="title"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                        placeholder="Enter your Post Title"
                                                        type="text"
                                                        name="title"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.title}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {errors.title && touched.title && errors.title}

                                        <QuillNoSSRWrapper
                                            theme="snow"
                                            onChange={v => setPostContent(v)}
                                            value={postContent}
                                            modules={modules}
                                            formats={formats} />


                                        {/* featured Image */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Featured Image</label>

                                            {uploadedFeaturedImage ?
                                                <div className='block'>
                                                    <div>
                                                        <Image src={`/uploads/${uploadedFeaturedImage}`}
                                                            width={300} height={250}
                                                            alt="Featured Image"
                                                        />
                                                    </div>
                                                    <button className="px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                                                        onClick={() => setUploadedFeaturedImage(null)}
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
                                                                    onChange={async (event) => {
                                                                        let file = event.target.files![0];

                                                                        let fd = new FormData()
                                                                        fd.append('image', file)

                                                                        // console.log('file being uploaded', fd);

                                                                        await axios.post('/api/posts/images', fd)
                                                                            .then(res => {
                                                                                const fileName = res.data.filename;
                                                                                setUploadedFeaturedImage(fileName);
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

                                        {/* post category */}
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                                    Category
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        id="category"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                        placeholder="Enter your Post category"
                                                        type="text"
                                                        name="category"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.category}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {errors.category && touched.category && errors.category}


                                    </div>

                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </Formik>}

        </Layout>
    )
}

export default EditPost