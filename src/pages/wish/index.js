import React, { useState, useEffect, useContext } from 'react';
import styles from "./index.module.scss";
import WishGrid from '../../components/grid/wishGrid/WishGrid';
import wishService from '../../services/wish.service';


const index = () => {
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
                <WishGrid movies={movies} />
            </div>
        </div>
    );
};

export default index;