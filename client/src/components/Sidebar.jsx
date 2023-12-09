import { List, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Sidebar = () => {
    return (
        <>
            <Typography
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    padding: 1,
                }}
                variant="h6">
                カテゴリ
            </Typography>
            <List component={'nav'}>
                <ListItemButton>
                    <ListItemText primary="全て" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="映画" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="TV" />
                </ListItemButton>
            </List>
        </>
    )
}

export default Sidebar
