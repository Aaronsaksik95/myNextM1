import React, { useState, useEffect } from 'react';
import styles from "./index.module.scss";
import SimpleGrid from '../../components/grid/simpleGrid/SimpleGrid';
import wishService from '../../services/wish.service';


const Index = () => {
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
        <div className={styles.shop}>
            <div className={styles.grid__shop}>
                <SimpleGrid movies={movies} />
            </div>
        </div>
    );
};

export default Index;