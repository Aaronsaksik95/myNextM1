import React from 'react';
import styles from './DetailGrid.module.scss'
import Card from '../../card/mainCard/Card';
import { getMovies } from "../../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";


const DetailGrid = (props) => {
    const { loading, error, data } = useQuery(getMovies, {
        variables: { category: props.category, superSub: props.superSub }
    });
    if (loading) {
        return "";
    }

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <div>
            <h2>Titres similaires</h2>
            <div className={styles.grid}>
                    {
                        data.getMovies.map((movie) => (
                            <Card movie={movie} key={movie.id} />
                        ))
                    }
            </div>
        </div>



    );
};

export default DetailGrid;