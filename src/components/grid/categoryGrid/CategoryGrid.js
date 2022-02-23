import React from 'react';
import styles from './CategoryGrid.module.scss'
import Card from '../../card/mainCard/Card';
import WishCard from '../../card/WishCard/WishCard'
import { useRouter } from 'next/router';
import { useQuery } from "@apollo/react-hooks";
import { getMovies } from "../../../graphql/queries/movies";


const CategoryGrid = (props) => {
    const router = useRouter()

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
        <div className={styles.grid}>
            {
                data.getMovies.map((movie) => (
                    <Card movie={movie} key={movie.id} />
                ))
            }
        </div>
    );
};

export default CategoryGrid;