import React, { forwardRef } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';

export const Item = forwardRef(({ id, ...props }: any, ref) => {
    return (
        <div {...props} ref={ref}>
            <div key={id} className='w-full my-2 p-4 border border-solid hover:border-dotted border-slate-200'>
                <div className="flex">
                    <div className='block w-full h-full'>
                        {props?.category?.title}
                    </div>
                    <button className='text-red-500' onClick={() => deleteCategory(Number(id))}>
                        <RiDeleteBin2Line />
                    </button>
                </div>
            </div>
        </div>
    )
});

function deleteCategory(arg0: number): void {
    throw new Error('Function not implemented.');
}
