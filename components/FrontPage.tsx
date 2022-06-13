import axios from 'axios';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react'
import { IPost } from '../utils/interface/IPost';
import Posts from './Posts'

const FrontPage: NextPage = () => {
    const [posts, setPosts] = useState<IPost[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/posts');
            setPosts(res.data.posts);
            setLoading(false);
        })();
    }, []);

    return (
        <div className='container mx-auto'>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                {
                    loading ? <div>Loading...</div> : posts?.map(post =>
                        <Posts key={post._id} post={post} />
                    )
                }
            </div>
        </div>
    )
}

export default FrontPage