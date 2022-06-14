import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InputField from '../../../components/dashboard/form/InputField';
import Layout from '../../../components/dashboard/Layout';
import Toast from '../../../components/Toast';
import { ICategory } from '../../../utils/interface/ICategory';

const EditCategory = () => {

    const [category, setCategory] = useState<ICategory | null>(null);

    const [categories, setCategories] = useState<ICategory[] | null>(null);

    const router = useRouter();
    const categoryId = router.query?.id;

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!categoryId) return;

        (async () => {
            await axios.get('/api/categories?id=' + categoryId)
                .then(res => {
                    setCategory(res.data?.category);
                    console.log(res.data?.category);
                }).catch(err => console.log(err));

            const res = await axios.get('/api/categories');
            setCategories(res.data.categories);

            setLoading(false);
        })();
    }, [categoryId]);

    return (
        <Layout>

            {category?.categoryUpdated && <Toast message='Category updated successfully.' type='success' />}

            {!loading && category && <Formik
                initialValues={{ title: category?.title, parent: category?.parent }}
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
                                    ...category, categoryUpdated: true
                                });
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
                                    <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>Add Another</button>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <Form onSubmit={handleSubmit} method="POST">
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                        {/* category title */}
                                        <InputField
                                            fieldname='title'
                                            label='Category Title'
                                            type='text'
                                            value={values.title}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            setFieldValue={setFieldValue}
                                        />

                                        {categories &&
                                            <>
                                                <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700">Parent</label>

                                                <Field name="parent" as="select" id="parentCategory" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none">
                                                    {!category.parent && <option selected> No Parent </option>}

                                                    {categories.map((c) => {
                                                        return (
                                                            c?._id !== category._id &&
                                                            <option
                                                                key={c._id}
                                                                value={c._id}
                                                                selected={c?._id.toString() == category.parent}
                                                            >
                                                                {c.title}
                                                            </option>)
                                                    }
                                                    )}
                                                </Field>
                                            </>
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