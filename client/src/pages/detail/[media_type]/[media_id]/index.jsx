import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Rating,
    Typography,
} from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect } from 'react'

const Detail = ({ detailData, media_type, media_id }) => {
    const [reviews, setReviews] = React.useState([])

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await laravelAxios.get(
                    `api/reviews/${media_type}/${media_id}`,
                )
                console.log(response.data)
                setReviews(response.data)
            } catch {
                console.log('error')
            }
        }

        fetchReviews()
    }, [media_type, media_id])
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail
                </h2>
            }>
            <Head>
                <title>Laravel - Detail</title>
            </Head>
            <Box
                sx={{
                    height: {
                        xs: 'auto',
                        sm: 'auto',
                        md: 'auto',
                        lg: 'auto',
                        xl: '70vh',
                    },
                    bgcolor: 'red',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
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
                    }}></Box>
                <Container sx={{ zIndex: 1 }}>
                    <Grid
                        container
                        sx={{ color: 'white' }}
                        alignItems={'center'}>
                        <Grid
                            item
                            md={4}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                            <img
                                width={'70%'}
                                src={`https://image.tmdb.org/t/p/original/${detailData.poster_path}`}
                                alt={detailData.title}
                            />
                        </Grid>
                        <Grid item md={8}>
                            <Typography variant={'h4'} paragraph>
                                {detailData.title}
                            </Typography>
                            <Typography paragraph>
                                {detailData.overview}
                            </Typography>
                            <Typography>
                                公開日；{detailData.release_date}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* レビュー内容 */}
            <Container sx={{ py: 4 }}>
                <Typography
                    component={'h1'}
                    variant={'h4'}
                    align="center"
                    gutterBottom>
                    レビュー一覧
                </Typography>
                <Grid container spacing={3}>
                    {reviews.map(review => (
                        <Grid item xs={12} md={6} lg={4} key={review.id}>
                            <Card>
                                <CardContent>
                                    {/* <Typography
                                        variant={'h5'}
                                        component={'div'}
                                        gutterBottom>
                                        {review.user.name}
                                    </Typography> */}
                                    <Rating value={review.rating} readOnly />

                                    <Typography
                                        variant={'body2'}
                                        color={'text.secondary'}
                                        component={'p'}>
                                        {review.body}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </AppLayout>
    )
}

// SSR
export async function getServerSideProps(context) {
    const { media_type, media_id } = context.params

    try {
        const jpRes = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )
        let combinedData = { ...jpRes.data }
        if (!jpRes.data.overview) {
            const enRes = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
            )
            combinedData.overview = enRes.data.overview
        }

        return {
            props: {
                detailData: combinedData,
                media_type,
                media_id,
            },
        }
    } catch {
        return {
            notFound: true,
        }
    }
}
export default Detail
