import React, { useEffect, useState } from 'react';
import styles from "./Card.module.scss";
import Link from 'next/link'
import { useRouter } from 'next/router';
import wishService from '../../../services/wish.service'

const Card = (props) => {
    const router = useRouter()
    var params = router.query
    const [exist, setExist] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        wishService
            .verifyMovieExist(props.movie.id, token)
            .then((data) => {
                setExist(data.exist)
            })
    }, [])

    const addMovieWish = (movie) => {
        const token = localStorage.getItem("token")
        wishService
            .addWish(movie, token)
            .then((data) => {
                if (data.addWish) {
                    setExist(true)
                }
            })
    }

    const deleteMovieWish = (movie) => {
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
                <Link href={{ pathname: '/browse', query: { genre: params.genre, id: props.movie.id } }}>
                    <img
                        className={styles.image__card}
                        src={props.movie.image}
                        alt="Picture of the author"
                    />
                </Link>
                <div>
                    <p className={styles.name__card}>{props.movie.name}</p>
                    <p className={styles.desc__card}>{props.movie._id}</p>
                </div>
                <div>
                    {exist ? (
                        <p onClick={() => deleteMovieWish(props.movie.id)}>delete</p>
                    ) : (
                        <p onClick={() => addMovieWish(props.movie.id)}>add</p>
                    )
                    }

                </div>
            </div>
        </div >

    );
};

export default Card;