import React from 'react'
const DOMPurify = require('isomorphic-dompurify');

const Post = () => {
    return (
        <>
            <div>Post</div>
            {DOMPurify.sanitize('<p>Hello from the other side.</p>')}
        </>
    )
}

export default Post