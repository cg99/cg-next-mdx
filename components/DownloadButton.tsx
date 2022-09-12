import React from 'react'

const DownloadButton = ({ link }) => {
    return (
        <a href={link} className='bg-blue-600 rounded-full text-white dark:text-slate-300 py-2 px-4 mt-8 shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
            Load More
        </a>
    )
}

export default DownloadButton