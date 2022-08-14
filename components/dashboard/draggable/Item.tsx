import React, { forwardRef } from 'react';

export const Item = forwardRef(({ id, ...props }: any, ref) => {
    return (
        <div {...props} ref={ref}>{id}</div>
    )
});