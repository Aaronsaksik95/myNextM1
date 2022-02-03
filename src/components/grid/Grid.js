import React from 'react';
import styles from './Grid.module.scss'
import Card from '../card/Card';

const Grid = (props) => {
    console.log(props)
    return (
        <div className={styles.grid}>
            {
                props.movies.map((movie) => (
                    <Card movie={movie} key={movie.id}/>
                ) )
            }
        </div>
    );
};

export default Grid;