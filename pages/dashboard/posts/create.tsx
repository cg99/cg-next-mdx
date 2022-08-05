import axios from 'axios';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css";
import Layout from '../../../components/dashboard/Layout';
import Toast from '../../../components/Toast';
import Router from 'next/router';
import ImageInput from '../../../components/dashboard/form/ImageInput';
import InputField from '../../../components/dashboard/form/InputField';
import slugify from 'slugify';
import { ICategory } from '../../../utils/interface/ICategory';
import Select from 'react-select';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})


const AddPost = () => {

    const [post, setPost] = useState({
        slug: '',
        postCreated: false,
        uploadedFeaturedImage: null,
    });

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

    const [categories, setCategories] = useState<ICategory[] | null>(null);

    useEffect(() => { // get catgories
        (async () => {
            const res = await axios.get('/api/categories');
            setCategories(res.data.categories);
        })();
    }, []);

    // category options
    const options = categories?.map((c, i) => {
        return {
            value: c._id, label: c.title
        }
    })

    const [showToastMessage, setShowToastMessage] = useState(false);

    const ToastMessage = <Toast message='Post created successfully.' type='success' update={setShowToastMessage} />;

    return (
        <Layout>

            {showToastMessage && ToastMessage}

            <Formik
                initialValues={{ title: '', slug: '', content: '', categories: [], featuredImage: post.uploadedFeaturedImage }}
                validate={values => {
                    const errors: any = {};
                    if (!values.title) {
                        errors.title = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log(values);

                    // return;

                    const bodyContent = { ...values, featuredImage: post.uploadedFeaturedImage }
                    const data = await axios.post('/api/posts', bodyContent)
                        .then(res => {
                            if (res.data.success === true) {
                                setPost({ ...post });
                                setShowToastMessage(true);
                            } else {
                                console.error('error', res.data)
                            }
                            return res.data.post;
                        })
                        .catch(err => console.log(err));

                    setSubmitting(false);

                    Router.push('/dashboard/posts/edit?id=' + data._id);
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
                    setFieldValue,
                    /* and other goodies */
                }) => (

                    <>
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Post</h3>
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
                                            value={values.title}
                                            handleChange={handleChange}
                                            handleBlur={() => {
                                                const slug = slugify(values.title, { lower: true });
                                                setFieldValue('slug', slug);
                                            }}
                                            // values={values}
                                            errors={errors}
                                            touched={touched}
                                        // setFieldValue={setFieldValue}
                                        />

                                        {/* post slug */}
                                        <InputField
                                            fieldname='slug'
                                            label='URL'
                                            type='text'
                                            value={values.slug}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            // values={values}
                                            errors={errors}
                                            touched={touched}
                                        // setFieldValue={setFieldValue}
                                        />

                                        <QuillNoSSRWrapper
                                            theme="snow"
                                            onChange={v => setFieldValue('content', v)}
                                            modules={modules}
                                            formats={formats} />

                                        {/* featured Image */}
                                        <ImageInput post={post} setPost={setPost} handleBlur={handleBlur} />


                                        {/* post category */}
                                        {/* <InputField
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
                                        {/* {categories &&
                                            <div>
                                                <label htmlFor="postCategory" className="block text-sm font-medium text-gray-700">Category</label>
                                                <Field
                                                    name="category"
                                                    as="select"
                                                    multiple
                                                    id="postCategory"
                                                    // setFieldValue={setFieldValue}
                                                    className="form-select appearance-none block shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 w-full sm:text-sm border border-gray-300 rounded-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none text-base font-normal bg-white bg-clip-padding bg-no-repeat transition ease-in-out">
                                                    {categories.map((category) => (
                                                        <option
                                                            // onClick={(e) => {
                                                            //     const cat = values.category;
                                                            //     cat.push(e);
                                                            //     setFieldValue('category', cat)
                                                            //     setCategories(categories.filter(c => c._id !== e.target.value))

                                                            //     // console.log(values.category);
                                                            // }}
                                                            key={category._id} value={category._id}>
                                                            {category.title}
                                                        </option>)
                                                    )}
                                                </Field>
                                            </div>
                                        }
                                         */}

                                        <div className="block h-full">
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
                                                options={options} />
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
                )
                }
            </Formik >

        </Layout >
    )
}

export default AddPost