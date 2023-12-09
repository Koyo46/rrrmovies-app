import AppLayout from '@/components/Layouts/AppLayout'
import Layout from '@/components/Layouts/Layout'
import MediaCard from '@/components/MediaCard'
import Sidebar from '@/components/Sidebar'
import { Grid } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useEffect } from 'react'

const search = () => {
    const [category, setCategory] = useState('all')
    const [searchResults, setSearchResults] = useState([])
    const router = useRouter()
    const { query: searchQuery } = router.query
    // console.log(searchQuery)
    // console.log(category)

    useEffect(() => {
        if (!searchQuery) return
        const fetchMedia = async () => {
            try {
                const response = await axios.get(
                    `api/searchMedia?searchQuery=${searchQuery}`,
                )
                // console.log(response.data)
                const searchResults = response.data.results
                // console.log(searchResults)

                const validResults = searchResults.filter(
                    item =>
                        item.media_type === 'movie' || item.media_type === 'tv',
                )
                // console.log(validResults)
                setSearchResults(validResults)
                // console.log(searchResults)
            } catch (error) {
                console.log(error)
            }
        }

        fetchMedia()
    }, [searchQuery])

    const filterdResults = searchResults.filter(result => {
        if (category == 'all') {
            return true
        }
        return result.media_type == category
    })

    console.log(filterdResults)
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Search
                </h2>
            }>
            <Head>
                <title>Laravel - Search</title>
            </Head>
            <Layout sidebar={<Sidebar setCategory={setCategory} />}>
                <Grid container spacing={3}>
                    <MediaCard results={searchResults} />
                </Grid>
            </Layout>
        </AppLayout>
    )
}

export default search
