import React from 'react';

import { getMovies } from "../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";
import Grid from '../../components/grid/Grid';
import styles from "./index.module.scss";

const Index = () => {
    const { loading, error, data } = useQuery(getMovies);

    if (loading) {
        return "loading...";
    }

    if (error) {
        console.log(error);
        return null;
    }
    console.log(data)
    return (
        <div className={styles.shop}>
            <div className={styles.grid__shop}>
                <Grid movies={data.getMovies} />
            </div>
        </div>
    );
}

export default Index;
