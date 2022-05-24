import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'

const router = useRouter();
const { month, year, slug } = router.query

const Post = () => {

    return (
        <>
            <h1>Post: {month}</h1><h1>Comment: {year}</h1>
        </>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await axios.get('/api/posts');
    const posts = await res.data.posts

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
        params: {
            year: post.createdAt.substring(0, 4),
            month: post.createdAt.substring(5, 7),
            slug: post.slug,
        },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `year` `month` `slug`.
    // If the route is like /posts/2022/03/this-is-the-title-slug, then params.year is 2022
    const res = await axios.get(`/api/${year}/${month}/${slug}`);

    const post = await res.data.post;

    // Pass post data to the page via props
    return { props: { post } }
}

export default Post