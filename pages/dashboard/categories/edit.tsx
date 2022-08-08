import axios from 'axios';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InputField from '../../../components/dashboard/form/InputField';
import Layout from '../../../components/dashboard/Layout';
import { ICategory } from '../../../utils/interface/ICategory';
import Select from 'react-select';
import Toast from '../../../components/Toast';
import { AiOutlineClose } from 'react-icons/ai';

const EditCategory = () => {

    const [category, setCategory] = useState<ICategory | null>(null);

    const [categories, setCategories] = useState<ICategory[] | null>(null);

    const router = useRouter();
    const categoryId = router.query?.id;

    const [loading, setLoading] = useState(true);

    // if post is updated
    const [showToastMessage, setShowToastMessage] = useState(false);

    const ToastMessage = <Toast message='Category updated successfully.' type='success' update={setShowToastMessage} />;

    useEffect(() => {
        if (!categoryId) return;

        (async () => {
            await axios.get('/api/categories?id=' + categoryId)
                .then(res => {
                    setCategory(res.data?.category);
                    // console.log(res.data?.category);
                }).catch(err => console.log(err));

            const res = await axios.get('/api/categories');
            setCategories(res.data.categories);

            setLoading(false);
        })();
    }, [categoryId, showToastMessage]);

    const [options, setOptions] = useState();
    const [defaultParent, setDefaultParent] = useState<any>();

    useEffect(() => {
        // parent categories optoiins
        const opt: any = categories?.map((c, i) => {
            return {
                value: c._id, label: c.title
            }
        })
        setOptions(opt);

        // parent category default value
        const parent: any = categories?.find(cat => cat?._id === category?.parent);
        const defaultValue = {
            value: parent?._id, label: parent?.title
        }

        setDefaultParent(defaultValue);
    }, [categories]);



    return (
        <Layout>

            {showToastMessage && ToastMessage}

            {!loading && category && <Formik
                initialValues={{ title: category?.title, parent: category?.parent, slug: category?.slug }}
                validate={values => {
                    const errors: any = {};
                    if (!values.title) {
                        errors.title = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {

                    const bodyContent = { ...values };

                    await axios.post('/api/categories?id=' + categoryId, bodyContent)
                        .then(res => {
                            if (res.data.success === true) {
                                setCategory({
                                    ...res.data?.category
                                });
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
                    setFieldValue,
                    /* and other goodies */
                }) => (

                    <>
                        <div className="md:col-span-1 mb-4">
                            <div className="columns-2 justify-between flex px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Category</h3>

                                <Link href="/dashboard/categories/create">
                                    <a className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>Add Another</a>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <Form onSubmit={handleSubmit} method="POST">
                                <div className="shadow sm:rounded-md">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                        {/* category title */}
                                        <InputField
                                            fieldname='title'
                                            label='Category Title'
                                            type='text'
                                            value={values.title}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errors={errors}
                                            touched={touched}
                                        />

                                        {/* category slug */}
                                        <InputField
                                            fieldname='slug'
                                            label='URL'
                                            type='text'
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errors={errors}
                                            touched={touched}
                                            value={values.slug}
                                        />

                                        {categories &&
                                            <div className="block h-full">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                                                <div className="mt-1 grid grid-cols-2 gap-2">

                                                    <Select
                                                        id="pare n t-select"
                                                        instanceId="pare n t-select"
                                                        name='parent'
                                                        // isMulti
                                                        className="basic-multi-select"
                                                        classNamePrefix="parent-select"
                                                        onChange={(v: any) => {
                                                            setFieldValue('parent', v?.value);
                                                        }}
                                                        options={options}
                                                    // defaultValue={defaultParent}
                                                    />
                                                    {values?.parent &&
                                                        <button type="button"
                                                            onClick={() => {
                                                                setFieldValue('parent', null)
                                                                setDefaultParent(null);
                                                            }}
                                                            className="w-10 px-2 py-2 border-2 border-red-600 text-red-600  justify-center font-medium text-lg leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"><AiOutlineClose className='mx-auto' /></button>
                                                    }
                                                </div>
                                            </div>
                                        }


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

        </Layout >
    )
}

export default EditCategory