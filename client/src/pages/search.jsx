import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'

const search = () => {
    const [searchResults, setSearchResults] = React.useState([])
    const router = useRouter()
    const { query: searchQuery } = router.query
    console.log(searchQuery)

    useEffect(() => {
        if (!searchQuery) return
        const fetchMedia = async () => {
            try {
                const response = await axios.get(
                    `api/searchMedia?searchQuery=${searchQuery}`,
                )
                console.log(response.data)
                const searchResults = response.data.results
                console.log(searchResults)

                const validResults = searchResults.filter(
                    item =>
                        item.media_type === 'movie' || item.media_type === 'tv',
                )
                console.log(validResults)
                setSearchResults(validResults)
                console.log(searchResults)
            } catch (error) {
                console.log(error)
            }
        }

        fetchMedia()
    }, [searchQuery])
    return <div>search</div>
}

export default search
