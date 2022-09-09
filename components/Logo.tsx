import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { ThemeContext } from '../context/theme'

const Logo = () => {
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
    }, [theme])

    return (
        <div className='flex items-center justify-between my-8 mx-20'>
            <Link href="/" className='grid content-center'>
                <a className='p-2 dark:bg-white/20 rounded flex items-center'>
                    <Image src="/images/logo.png" width={250} height={50} className="hover:cursor-pointer" />
                </a>
            </Link>
            <div className="text-lg dark:text-gray-200 text-slate-600">
                unique projects with source code
            </div>

            <button
                id="theme-toggle"
                type="button"
                className="text-purple-500 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-700 rounded-lg text-sm p-2.5"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {theme === "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
            </button>

        </div>
    )
}

export default Logo