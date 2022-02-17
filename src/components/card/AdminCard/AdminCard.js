import React, { useEffect, useState } from 'react';
import styles from "./AdminCard.module.scss";
import Link from 'next/link'
import { useRouter } from 'next/router';
import wishService from '../../../services/wish.service'

const AdminCard = (props) => {
    const router = useRouter()
    var params = router.query

    const deleteMovie = (movie) => {
        const token = localStorage.getItem("token")
        wishService
            .deleteOneMovie(movie, token)
            .then(() => {
                setExist(false)
            })
    }

    return (
        <div className={styles.card}>
            <div>
                <Link href={{ pathname: '/admin/movies', query: { genre: params.genre, id: props.movie.id } }}>
                    <img
                        className={styles.image__card}
                        src={props.movie.image}
                        alt="Picture of the author"
                    />
                </Link>
                <div>
                    <p className={styles.name__card}>{props.movie.name}</p>
                    <p className={styles.desc__card}>{props.movie.description}</p>
                    <p className={styles.desc__card}>{props.movie.id}</p>
                </div>
                <div>
                    <p onClick={() => deleteMovie(props.movie._id)}>delete</p>
                    <Link href={{ pathname: '/admin/updateMovie', query: { id: props.movie.id } }}>
                        <a>Modifier</a>
                    </Link>
                </div>
            </div>
        </div >

    );
};

export default AdminCard;