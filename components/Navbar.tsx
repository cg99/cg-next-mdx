import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-blue-800 px-16'>
            <ul className='flex text-slate-50'>
                <li className='px-4 py-4 hover:bg-blue-900'><a href="#">Home</a></li>
                <li className='px-4 py-4 hover:bg-blue-900'><a href="#">JavaScript</a></li>
                <li className='px-4 py-4 hover:bg-blue-900'><a href="#">PHP</a></li>
                <li className='px-4 py-4 hover:bg-blue-900'><a href="#">HTML/CSS</a></li>
                <li className='px-4 py-4 hover:bg-blue-900'><a href="#">Python</a></li>
                <li className='px-4 py-4 hover:bg-blue-900'><a href="#">C/C++</a></li>
            </ul>
        </div>
    )
}

export default Navbar