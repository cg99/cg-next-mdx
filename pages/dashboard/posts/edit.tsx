import axios from 'axios';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import "react-quill/dist/quill.snow.css";
import Layout from '../../../components/dashboard/Layout';
import Toast from '../../../components/Toast';
import { IPost } from '../../../utils/interface/IPost';
import InputField from '../../../components/dashboard/form/InputField';
import ImageInput from '../../../components/dashboard/form/ImageInput';
import slugify from 'slugify';
import { NextPage } from 'next';
import Select from 'react-select';
import { ICategory } from '../../../utils/interface/ICategory';


const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})


const EditPost: NextPage = () => {
    const [post, setPost] = useState<IPost | null>(null);

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

    useEffect(() => {
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

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/categories');
            setCategories(res.data.categories);
        })();
    }, []);

    const options = categories?.reduce((acc: { value: number | string, label: string }[], cat) => {
        const obj = {
            value: cat._id, label: cat.title
        };
        acc.push(obj);
        return acc;
    }, [])

    const defaultOptions = categories?.filter(category => {
        const selectedCategories = post?.categories;
        if (!selectedCategories) return true; // check if post has any category selected

        const len = selectedCategories?.length; // length of the post categories
        let matched = false;
        for (let i = 0; i < len; i++) {
            const item = selectedCategories[i];
            if (item?.value === category?._id.toString()) {
                matched = true;
                break;
            }
        }
        return matched;
    }).reduce((acc: { value: number | string, label: string }[], cat) => {
        const obj = {
            value: cat._id, label: cat.title
        };
        acc.push(obj);
        return acc;
    }, [])

    return (
        <Layout>

            {post?.postUpdated && <Toast message='Post updated successfully.' type='success' />}

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

                    await axios.post('/api/posts/?id=' + postId, bodyContent)
                        .then(res => {
                            if (res.data.success === true) {
                                setPost({ ...post, postUpdated: true });
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

                                        <div className="selected-categories">
                                            <span>Selected Categories: </span>
                                            {post?.categories?.map((cat, idx) => (
                                                <span key={cat?.value}>{`${idx == 0 ? '' : ', '}${cat.label}`}</span>
                                            ))}
                                        </div>
                                        <div className="block h-full">
                                            <Select
                                                id="category-select"
                                                instanceId="category-select"
                                                name='categories'
                                                isMulti
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                onChange={(v) => {
                                                    setFieldValue('category', v);
                                                }}
                                                options={options}
                                                defaultValue={defaultOptions}
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