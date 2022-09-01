import axios from 'axios';
import router from 'next/router';
import React, { useEffect, useState } from 'react'
import Post from '../../components/Post';
import Template from '../../components/Template';
import { IPost } from '../../utils/interface/IPost';

const index = ({ slug }) => {
    const [posts, setPosts] = useState<IPost[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/posts', {
                params: {
                    slug
                }
            });
            setPosts(res.data.posts);
            setLoading(false);
        })();
    }, []);


    return (
        <Template>
            <div className='container mx-auto'>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                    {
                        loading ? <div>Loading...</div> : posts?.map(post =>
                            <Post key={post._id} post={post} />
                        )
                    }
                </div>
            </div>
        </Template>
    )
}

index.getInitialProps = async ({ query }) => {
    const { slug } = query

    return { slug }
}

export default index