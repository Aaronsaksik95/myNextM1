import React from 'react';
import styles from './Grid.module.scss'
import Card from '../../card/mainCard/Card';
import WishCard from '../../card/wishCard/WishCard'
import { useRouter } from 'next/router';


const SimpleGrid = (props) => {
    const router = useRouter()
    return (
        <div className={styles.grid}>
            {router.pathname == '/wish' ? (
                props.movies.map((movie) => (
                    <WishCard movie={movie} key={movie._id} />
                ))
            ) : (
                props.movies.map((movie) => (
                    <Card movie={movie} key={movie.id} />
                ))
            )

            }
        </div>
    );
};

export default SimpleGrid;