import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IPost } from '../utils/interface/IPost';
import Blog from './Blog'

const FrontPage = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/api/posts');
            setPosts(res.data.posts);
            setLoading(false);

        }
        fetchPosts();
    }, []);

    return (
        <div className='container mx-auto'>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                {
                    loading ? <div>Loading...</div> : posts.map(post =>
                        <Blog key={post._id} post={post} />
                    )
                }
            </div>
        </div>
    )
}

export default FrontPage