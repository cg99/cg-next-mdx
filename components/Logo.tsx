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
        <div className='flex items-center justify-between py-6 px-20 dark:bg-slate-800'>
            <div className="text-lg dark:text-gray-200 text-slate-600">
                <Link href="/" className='grid content-center'>
                    <a className='p-2 rounded flex items-center'>
                        <Image src="/images/logo.png"
                            width={250} height={50}
                            // quality={100}
                            // unoptimized={true}
                            className="hover:cursor-pointer" />
                    </a>
                </Link>
                {/* <span>unique projects with source code</span> */}
            </div>

            <button
                id="theme-toggle"
                type="button"
                className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 rounded-lg text-sm p-2.5"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {theme === "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
            </button>

        </div>
    )
}

export default Logo