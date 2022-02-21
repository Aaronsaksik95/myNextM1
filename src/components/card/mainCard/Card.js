import React, { useEffect, useState } from 'react';
import styles from "../Card.module.scss";
import Link from 'next/link'
import { useRouter } from 'next/router';
import wishService from '../../../services/wish.service'
import aime from '../../../../public/aime.png'

const Card = (props) => {
    const router = useRouter()
    var params = router.query
    const [exist, setExist] = useState(false)
    const [displayHover, setDisplayHover] = useState(false)

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
        <div>
            <div className={styles.card}>
                <Link href={{ pathname: '/browse', query: { genre: params.genre, id: props.movie.id } }}>
                    <img
                        className={styles.image__card}
                        src={props.movie.image}
                        alt="Picture of the author"
                    />
                </Link>
                <div className={styles.bar__info}>
                    <div className={styles.first_button}>
                        <button className='btn_around btn_around_white' onClick={() => router.push('/watch')}>▶</button>
                        {exist ? (
                            <button className='btn_around btn_around_black' onClick={() => deleteMovieWish(props.movie.id)}>✓</button>
                        ) : (
                            <button className='btn_around btn_around_black' onClick={() => addMovieWish(props.movie.id)}>+</button>

                        )
                        }
                        <button className='btn_around btn_around_black' onClick={() => router.push('/watch')}><img src='https://images.emojiterra.com/openmoji/v13.1/512px/1f90d.png'alt="" /></button>
                    </div>
                    <div>
                        <button className='btn_around btn_around_black' onClick={() => deleteMovieWish(props.movie.id)}>i</button>
                    </div>
                </div>
                <div className={styles.replace__info}></div>
            </div>
        </div>

    );
};

export default Card;