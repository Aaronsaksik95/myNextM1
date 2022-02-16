import React from 'react';
import styles from './SimpleGrid.module.scss'
import Card from '../../card/mainCard/Card';
import { getMovies } from "../../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";


const SimpleGrid = (props) => {
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
            {
                data.getMovies.map((movie) => (
                    <Card movie={movie} key={movie.id} />
                ))
            }
        </div>
    );
};

export default SimpleGrid;