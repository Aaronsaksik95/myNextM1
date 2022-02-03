import React, {useState, useEffect, useContext} from 'react';
import styles from "./index.module.scss";
import Grid from '../../components/grid/Grid';
import wishContext from '../../context/WishContext'


const index = () => {
    const {wish} = useContext(wishContext);
    return (
        <div className={styles.shop}>
            <div className={styles.grid__shop}>
                <Grid movies={wish} />
            </div>
        </div>
    );
};

export default index;