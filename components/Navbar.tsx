import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ICategory } from '../utils/interface/ICategory';

const Navbar = () => {
    const [categories, setCategories] = useState<ICategory[] | null>(null);

    useEffect(() => { // get caategories
        (async () => {
            const res = await axios.get('/api/categories');
            setCategories(res.data.categories);
        })();
    }, []);

    return (
        <div className='bg-blue-800 px-16'>
            <ul className='flex text-slate-50'>
                {categories?.map(category => (
                    <li className='px-4 py-4 hover:bg-blue-900' key={category?._id}>
                        <Link href={`/category/${category?.title}`}>
                            <a>{category?.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navbar