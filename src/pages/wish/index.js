import React, { useState, useEffect } from 'react';
import styles from "./index.module.scss";
import SimpleGrid from '../../components/grid/simpleGrid/SimpleGrid';
import wishService from '../../services/wish.service';
import Detail from '../../components/detail/Detail';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter()
    var params = router.query

    const [movies, setMovies] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token")
        wishService
            .getWish(token)
            .then((data) => {
                setMovies(data.wish.movies)
            })
    }, [])

    return (
        <div className={styles.wish}>
            {params.id ? (
                <Detail />
            ) : ""
            }
            <div className={styles.title__wish}>
                <p className='title h1'>Ma liste</p>
            </div>

            <div className={styles.wish__grid}>
                <SimpleGrid movies={movies} />
            </div>
        </div>
    );
};

export default Index;