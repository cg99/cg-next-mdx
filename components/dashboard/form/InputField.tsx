import { Field } from 'formik';
import React from 'react'

const InputField = ({ handleChange, handleBlur, errors, touched, fieldname, label, type, value }) => {
    return (
        <>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                    <label htmlFor={fieldname} className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <Field
                            id={fieldname}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            placeholder={`Enter ${label}`}
                            type={type}
                            name={fieldname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={value}
                        />
                    </div>
                </div>
            </div>
            {errors.fieldname && touched.fieldname && errors.fieldname}
        </>
    )
}

export default InputField