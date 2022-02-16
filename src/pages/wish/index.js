import React, { useState, useEffect, useContext } from 'react';
import styles from "./index.module.scss";
import SimpleGrid from '../../components/grid/simpleGrid/SimpleGrid';
import wishService from '../../services/wish.service';


const index = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token")
        wishService
            .getWish(token)
            .then((data) => {
                console.log(data.wish.movies)
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

export default index;