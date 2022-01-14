import React from 'react';
import styles from './Grid.module.scss'
import Card from '../card/card';

const Grid = (props) => {
    return (
        <div className={styles.grid}>
            {
                props.movies.getMovies.map((movie) => (
                    // <div className="movie__card" key={movie._id}>
                    //     {movie.name}
                    //     {movie.price}
                    // </div>
                    <Card movie={movie} />
                ) )
            }
        </div>
    );
};

export default Grid;