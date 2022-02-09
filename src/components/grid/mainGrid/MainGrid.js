import React from 'react';
import styles from './MainGrid.module.scss'
import Card from '../../card/Card';
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
    console.log(data, props.category.name)
    return (
        <div className={styles.grid}>
            <h1>{props.category.name}</h1>
            {
                data.getMovies.map((movie) => (
                    <Card movie={movie} key={movie.id}/>
                ) )
            }
        </div>
    );
};

export default MainGrid;