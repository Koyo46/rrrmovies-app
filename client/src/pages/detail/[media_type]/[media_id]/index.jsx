import { Box, Container, Grid } from '@mui/material'
import axios from 'axios'
import React from 'react'

const Detail = ({ detailData }) => {
    console.log(detailData)

    return (
        <Box
            sx={{
                height: '70vh',
                bgcolor: 'red',
                position: 'relative',
            }}>
            <Box
                sx={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${detailData.backdrop_path})`,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',

                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)',
                    },
                }}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}></Grid>
                        <Grid item xs={12} md={6}></Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

// SSR
export async function getServerSideProps(context) {
    const { media_type, media_id } = context.params

    try {
        console.log(process.env.TMDB_API_KEY)
        const res = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )
        process.env.TMDB_API_KEY
        const fetchData = res.data

        return {
            props: {
                detailData: fetchData,
            },
        }
    } catch {
        return {
            notFound: true,
        }
    }
}
export default Detail
