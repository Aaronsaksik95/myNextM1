import React from 'react';
import styles from './SimpleGrid.module.scss'
import Card from '../../card/mainCard/Card';


const SimpleGrid = (props) => {
    return (
        <div className={styles.grid}>
            {
                props.movies.map((movie) => (
                    <Card movie={movie} key={movie.id} />
                ))
            }
        </div>
    );
};

export default SimpleGrid;