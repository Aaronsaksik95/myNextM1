import React from 'react';
import styles from './MainGrid.module.scss'
import Card from '../../card/mainCard/Card';
import { getMovies } from "../../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";


const MainGrid = (props) => {
    const { loading, error, data } = useQuery(getMovies, {
        variables: { category: props.category.id }
    });
    if (loading) {
        return "loading...";
    }

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <div className={styles.grid}>
            <h3 className={styles.category__grid}>{props.category.name}</h3>
            <div className={styles.movies__grid}>
                {
                    data.getMovies.map((movie) => (
                        <Card movie={movie} key={movie.id} />
                    ))
                }
            </div>
        </div>
    );
};

export default MainGrid;