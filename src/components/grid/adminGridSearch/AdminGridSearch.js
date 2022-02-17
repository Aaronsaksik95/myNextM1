import React, { useState } from 'react';
import styles from './AdminGridSearch.module.scss'
import AdminCard from '../../card/AdminCard/AdminCard';


const AdminGridSearch = (props) => {
    return (
        <div className={styles.grid}>
            {
                props.movies.map((movie) => (
                    <AdminCard movie={movie} key={movie.id} />
                ))
            }
        </div>
    );s
};

export default AdminGridSearch;