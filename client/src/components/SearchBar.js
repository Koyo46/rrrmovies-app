import { Box, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'
import Button from './Button'
import { useRouter } from 'next/router'

const SearchBar = () => {
    const [query, setQuery] = useState('') // 検索ワードを管理するstate
    const router = useRouter()

    const handlechange = e => {
        setQuery(e.target.value)
    }
    const searchQuery = e => {
        e.preventDefault()
        if (!query.trim()) {
            return
        }
        // alert(search)
        router.push(`/search?query=${encodeURIComponent(query)}`)
    }
    return (
        <Box
            component={'form'}
            onSubmit={searchQuery}
            sx={{
                width: '80%',
                margin: '3% auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <TextField
                onChange={handlechange}
                fullWidth
                variant="filled"
                placeholder="検索する"
                sx={{ mr: 2 }}
            />
            <Button type="submit">
                <SearchIcon />
            </Button>
        </Box>
    )
}

export default SearchBar
