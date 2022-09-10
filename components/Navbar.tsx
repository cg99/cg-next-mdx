import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import _ from 'lodash';
import { RiSearchEyeLine } from 'react-icons/ri';

function Navbar({ mobileMenuHidden, setMobileMenuHidden }) {
    const [categories, setCategories] = useState([
        'JavaScript', 'React JS',
        'Node.js', 'C/C++',
        'ExpressJS', 'PostgreSQL',
        'SQLite', 'Laravel',
        'Vue.js', 'HTML/CSS',
        'dJango', 'Mongoose',
        'Bulma', 'MySQL',
        'PHP', 'SQL',
        'Python', 'Deno',
        'MongoDB', 'NextJS'
    ]);

    useEffect(() => {
        setCategories(_.shuffle(categories));
    }, []);

    const [searchValue, setSearchValue] = useState('');


    return (
        <div className='bg-blue-800 px-0 sm:px-16 flex flex-col-reverse md:flex-row justify-between max-w-full overflow-hidden'>
            <ul className={`${mobileMenuHidden ? 'hidden' : 'block text-center'} md:flex text-slate-50`}>
                <Suspense>
                    {categories?.slice(0, 8).map((category, idx) => (
                        <li onClick={() => setMobileMenuHidden(!mobileMenuHidden)}
                            className='px-4 py-4 hover:bg-blue-900' key={idx}>
                            <Link href={{
                                pathname: '/',
                                query: { category: category },
                            }}>
                                <a className='text-white dark:text-slate-200 text-base'>{category}</a>
                            </Link>
                        </li>
                    ))}
                </Suspense>
            </ul>

            <div className={`${mobileMenuHidden ? 'hidden' : 'flex py-2'} md:flex  rounded-md shadow-sm justify-center relative items-center`}>
                <div className="xl:w-64">
                    <div className="my-auto input-group relative flex items-stretch w-full">
                        <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-4 py-1.5 text-base font-normal text-gray-700 bg-white dark:bg-slate-300 bg-clip-padding border-gray-300 rounded-l-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" onChange={(e) => {
                            // console.log(e.target.value);
                            setSearchValue(e.target.value);
                        }} />

                        <button className="inline-block px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" onClick={() => setMobileMenuHidden(!mobileMenuHidden)} type="button">
                            <Link href={{
                                pathname: '/',
                                query: { search: searchValue }
                            }}>
                                <a className='text-white text-xl'>
                                    <RiSearchEyeLine />
                                </a>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Navbar