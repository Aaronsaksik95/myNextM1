import React, { useEffect, useState } from 'react';
import styles from "./WishCard.module.scss";
import Link from 'next/link'
import { useRouter } from 'next/router';
import wishService from '../../../services/wish.service'
import ReactPlayer from 'react-player'
import arrow from '../../../../public/arrow.png'
import aime from '../../../../public/aime.png'
import play from '../../../../public/play.png'
import valide from '../../../../public/valide.png'

const WishCard = (props) => {
    const router = useRouter()
    var params = router.query
    const [displayHover, setDisplayHover] = useState(false)
    const [exist, setExist] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        wishService
            .verifyMovieExist(props.movie._id, token)
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
        <div onMouseOver={() => setDisplayHover(true)} onMouseOut={() => setDisplayHover(false)} className={styles.card}>
            {!displayHover ? (
                <Link href={{ pathname: `${router.pathname}`, query: { ...router.query, id: props.movie.id } }}>
                    <img
                        className={styles.image__card}
                        src={props.movie.image}
                        alt="Picture of the author"
                    />
                </Link>
            ) : (
                <Link href={{ pathname: `${router.pathname}`, query: { ...router.query, id: props.movie.id } }}>
                    <ReactPlayer playing={true} width='220px' height='124px' className={styles.image__card} url={props.movie.video} />
                </Link>
            )
            }
            <div className={styles.bar__info}>
                <div className={styles.button__info}>

                    <div className={styles.first_button}>
                        <button className='btn_around btn_around_white' onClick={() => router.push(`/watch/${props.movie._id}`)}><img src={play.src} alt="" /></button>
                        {exist ? (
                            <button className='btn_around btn_around_black' onClick={() => deleteMovieWish(props.movie._id)}><img src={valide.src} alt="" /></button>
                        ) : (
                            <button className='btn_around btn_around_black' onClick={() => addMovieWish(props.movie._id)}>+</button>

                        )
                        }
                        <button className='btn_around btn_around_black'><img src={aime.src} alt="" /></button>
                    </div>
                    <div>
                        <button className='btn_around btn_around_black' onClick={() => router.push({
                            pathname: `${router.pathname}`,
                            query: {
                                ...router.query,
                                id: props.movie._id
                            },
                        })}><img src={arrow.src} alt="" /></button>
                    </div>
                </div>
                <div className='reco'>
                    Recommandé à 98 %
                </div>
                <div className={styles.categories__info}>
                    {
                        props.movie.category.map((categ) => (
                            <p key={categ._id}>&nbsp;&nbsp;{categ.name}&nbsp;&nbsp;●</p>
                        ))
                    }
                </div>
            </div>
            <div className={styles.replace__info}></div>
        </div>

    );
};

export default WishCard;