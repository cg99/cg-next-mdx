import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Select from 'react-select';
import InputField from '../../../components/dashboard/form/InputField';
import Layout from '../../../components/dashboard/Layout';
import Toast from '../../../components/Toast';
import { ICategory } from '../../../utils/interface/ICategory';

const AddCategory = () => {

    const [category, setCategory] = useState<ICategory | null>(null);

    const [categories, setCategories] = useState<ICategory[] | null>(null);

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/categories');
            setCategories(res.data.categories);
        })();
    }, []);

    const [showToastMessage, setShowToastMessage] = useState(false);

    const ToastMessage = <Toast message='Category created successfully.' type='success' update={setShowToastMessage} />;

    const options: any = categories?.map((c, i) => {
        return {
            value: c._id, label: c.title
        }
    })

    // parent category
    // const parent = categories?.find(cat => cat?._id === category?.parent)?.title;
    const defaultParent: any = categories?.find(cat => cat?._id === category?.parent);
    const defaultValue: any = {
        value: defaultParent?._id, label: defaultParent?.title
    }


    return (
        <Layout>
            {showToastMessage && ToastMessage}

            <Formik
                initialValues={{ title: '', parent: '', slug: '' }}
                validate={values => {
                    const errors: any = {};
                    if (!values.title) {
                        errors.title = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {

                    const bodyContent = { ...values }
                    const data = await axios.post('/api/categories', bodyContent)
                        .then(res => {
                            if (res.data.success === true) {
                                if (category) {
                                    setCategory({
                                        ...category
                                    });
                                }
                            } else {
                                console.error('error', res.data)
                            }
                            return res.data.category;
                        })
                        .catch(err => console.log(err));

                    setSubmitting(false);

                    console.log(data);

                    Router.push('/dashboard/categories/edit?id=' + data._id);
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
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Category</h3>
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
                                            // values={values}
                                            errors={errors}
                                            touched={touched}
                                        // setFieldValue={setFieldValue}
                                        />


                                        {/* category slug */}
                                        <InputField
                                            fieldname='slug'
                                            label='Category Slug'
                                            type='text'
                                            value={values.slug}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            // values={values}
                                            errors={errors}
                                            touched={touched}
                                        // setFieldValue={setFieldValue}
                                        />

                                        {categories &&
                                            <div>
                                                <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700">Parent</label>
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
                                                    // defaultValue={defaultValue}
                                                    />
                                                    {values.parent &&
                                                        <button type="button"
                                                            onClick={() => setFieldValue('parent', undefined)}
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
                )
                }
            </Formik >

        </Layout >
    )
}

export default AddCategory