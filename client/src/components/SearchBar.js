import { Box, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'
import Button from './Button'
import { useRouter } from 'next/router'

const SearchBar = () => {
    const [search, setSearch] = useState('') // 検索ワードを管理するstate
    const router = useRouter()

    const handlechange = e => {
        setSearch(e.target.value)
    }
    const searchQuery = e => {
        e.preventDefault()
        if (!search.trim()) {
            return
        }
        // alert(search)
        router.push(`/search?query=${encodeURIComponent(search)}`)
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
