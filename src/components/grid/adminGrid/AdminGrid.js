import React from 'react';
import styles from './AdminGrid.module.scss'
import AdminCard from '../../card/AdminCard/AdminCard';
import { getMovies } from "../../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";


const AdminGrid = (props) => {
    var categoryId;
    if(typeof(props.category) == "object"){
        categoryId = props.category.id
    }
    else{
        categoryId = props.category
    }
    const { loading, error, data } = useQuery(getMovies, {
        variables: { category: categoryId }
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
            <div className={styles.movies__grid}>
                {
                    data.getMovies.map((movie) => (
                        <AdminCard movie={movie} key={movie.id} />
                    ))
                }
            </div>
        </div>
    );
};

export default AdminGrid;