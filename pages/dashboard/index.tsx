import { NextPage } from 'next'
import React from 'react'
import Layout from '../../components/dashboard/Layout'

const dashboard: NextPage = () => {
    return (
        <Layout>
            <h1>Dashboard</h1>
            <p>
                get number of posts, categories, media, views
            </p>
        </Layout>
    )
}

export default dashboard