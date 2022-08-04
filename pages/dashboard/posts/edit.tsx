import axios from 'axios';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import "react-quill/dist/quill.snow.css";
import Select from 'react-select';
import slugify from 'slugify';
import { setEnvironmentData } from 'worker_threads';
import ImageInput from '../../../components/dashboard/form/ImageInput';
import InputField from '../../../components/dashboard/form/InputField';
import Layout from '../../../components/dashboard/Layout';
import Toast from '../../../components/Toast';
import { ICategory } from '../../../utils/interface/ICategory';
import { IPost } from '../../../utils/interface/IPost';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})


const EditPost: NextPage = () => {
    const [post, setPost] = useState<IPost | null>(null);

    // for quill editor
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

    const router = useRouter();
    const postId = router.query?.id;

    const [loading, setLoading] = useState(true);

    useEffect(() => { // get a post
        if (postId) {
            (async () => {
                await axios.get(`/api/posts/${postId}`)
                    .then(res => {
                        const postData = res.data?.post;
                        setPost({ ...post, ...postData });
                        setLoading(false);
                    }).catch(err => {
                        console.log(err);
                    });
            })();
        }

    }, [postId]);

    const [categories, setCategories] = useState<ICategory[] | null>(null);

    useEffect(() => { // get caategories
        (async () => {
            const res = await axios.get('/api/categories');
            setCategories(res.data.categories);
        })();
    }, []);


    const options = categories?.map((c, i) => {
        return {
            value: c._id, label: c.title
        }
    })



    // if post is updated
    const [showToastMessage, setShowToastMessage] = useState(false);

    const ToastMessage = <Toast message='Post updated successfully.' type='success' update={setShowToastMessage} />;

    return (
        <Layout>

            {showToastMessage && ToastMessage}

            {!loading && post && <Formik
                initialValues={{ title: post?.title || '', slug: post?.slug || '', content: post?.content || '', categories: post?.categories || '', featuredImage: post?.featuredImage || '' }}
                validate={values => {
                    const errors: any = {};
                    if (!values.title) {
                        errors.title = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {

                    const bodyContent = { ...values, content: post?.content, featuredImage: post?.featuredImage }

                    // console.log(bodyContent);

                    await axios.post('/api/posts/' + postId, bodyContent)
                        .then(res => {
                            if (res.data.success === true) {
                                const postData = res.data?.post;
                                setPost({ ...post, ...postData });
                                setShowToastMessage(true);

                                setTimeout(() => setShowToastMessage(false), 1000);
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
                            <Form onSubmit={handleSubmit} method="POST">
                                <div className="shadow sm:rounded-md">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        {/* post title */}
                                        <InputField
                                            fieldname='title'
                                            label='Post Title'
                                            type='text'
                                            handleChange={handleChange}
                                            value={values.title}
                                            handleBlur={() => {
                                                const slug = slugify(values.title, { lower: true });
                                                setFieldValue('slug', slug);
                                            }}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            setFieldValue={setFieldValue}
                                        />

                                        {/* post slug */}
                                        {values.slug && <InputField
                                            fieldname='slug'
                                            label='URL'
                                            type='text'
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            setFieldValue={setFieldValue}
                                            value={values.slug}
                                        />}

                                        <QuillNoSSRWrapper
                                            theme="snow"
                                            onChange={v => setPost({ ...post, content: v })}
                                            value={post?.content}
                                            modules={modules}
                                            formats={formats} />

                                        {/* featured Image */}
                                        <ImageInput post={post} setPost={setPost} handleBlur={handleBlur} />


                                        {/* post category
                                        <InputField
                                            fieldname='category'
                                            label='Enter Category'
                                            type='text'
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            setFieldValue={setFieldValue}
                                            value={values.category}
                                        /> */}

                                        <div className="block h-full">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>

                                            <Select
                                                id="category-select"
                                                instanceId="category-select"
                                                name='categories'
                                                isMulti
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                onChange={(v) => {
                                                    setFieldValue('categories', v);
                                                }}
                                                options={options}
                                                defaultValue={post?.categories}
                                            />
                                        </div>

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
                            </Form>
                        </div>
                    </>
                )}
            </Formik>}

        </Layout>
    )
}

export default EditPost