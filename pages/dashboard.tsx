import { NextPage } from 'next'
import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'

const dashboard: NextPage = () => {
    return (
        <div className='flex columns-2 h-full'>
            <Sidebar />
            <main>
                <h1>Dashboard</h1>
            </main>
        </div>
    )
}

export default dashboard