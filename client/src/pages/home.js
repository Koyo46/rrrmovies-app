import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Home = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('api/getPopularMovies')
                // console.log(response.data.results);
                setMovies(response.data.results)
                console.log(movies)
            } catch (error) {
                console.log(err)
            }
        }
        fetchMovies()
    }, [])
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Home
                </h2>
            }>
            <Head>
                <title>Laravel - Home</title>
            </Head>
            <Swiper
                spaceBetween={50}
                slidesPerView={5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={swiper => console.log(swiper)}>
                {movies.map(movie => (
                    <SwiperSlide>
                        <img
                            key={movie.id}
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
        </AppLayout>
    )
}

export default Home
