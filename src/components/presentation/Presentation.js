import React from 'react';
import styles from './Presentation.module.scss'
import { getMovieNewest } from '../../graphql/queries/movies';
import { useQuery } from "@apollo/react-hooks";
import Link from 'next/link';

const Presentation = () => {

    const { loading, error, data } = useQuery(getMovieNewest);
    if (loading) {
        return "loading...";
    }

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <div>
            <div className={styles.pres}>
                <img className={styles.image__pres} src={data.getMovieNewest.image} alt="" />
                <div className={styles.text__pres}>
                    <h1 className={styles.title__pres}>{data.getMovieNewest.name}</h1>
                    <p className={styles.desc__pres}>{data.getMovieNewest.description}</p>
                    <div className={styles.button__pres}>
                        <Link href='/watch' >

                            <a className="btn btn-white"><span className={styles.icon}>▶</span>Lecture</a>
                        </Link>
                        <Link href='/watch' >
                            <a className="btn btn-muted">
                                <span className={styles.icon}>ⓘ</span>Plus d&lsquo;infos
                            </a>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Presentation;