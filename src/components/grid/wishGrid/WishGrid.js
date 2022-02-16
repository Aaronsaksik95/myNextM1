import React from 'react';
import styles from './WishGrid.module.scss'
import WishCard from '../../card/wishCard/WishCard';


const WishGrid = (props) => {
    return (
        <div className={styles.grid}>
            {
                props.movies.map((movie) => (
                    <WishCard movie={movie} key={movie.id} />
                ))
            }
        </div>
    );
};

export default WishGrid;