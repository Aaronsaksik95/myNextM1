import React from 'react';
import styles from './Grid.module.scss'
import Card from '../../card/mainCard/Card';
import { getMovies } from "../../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";


const MainGrid = (props) => {
    var categoryId;
    if (typeof (props.category) == "object") {
        categoryId = props.category.id
    }
    else {
        categoryId = props.category
    }
    const { loading, error, data } = useQuery(getMovies, {
        variables: { category: categoryId, superSub: props.superSub }
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
            <div className={styles.slider__grid}>
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