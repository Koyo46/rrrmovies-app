import { Box, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import Button from './Button'

const SearchBar = () => {
    return (
        <Box
            component={'form'}
            sx={{
                width: '80%',
                margin: '3% auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <TextField
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
