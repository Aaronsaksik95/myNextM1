import React, { useEffect, useState } from 'react';
import styles from "./Card.module.scss";
import Link from 'next/link'
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router';
import arrow from '../../../../public/arrow.png'
import aime from '../../../../public/aime.png'
import play from '../../../../public/play.png'
import AddWish from '../../UI/Button/AddWish/AddWish';

const Card = (props) => {
    const router = useRouter()
    var params = router.query
    const [displayHover, setDisplayHover] = useState(false)

    return (
        <div>
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
                        <ReactPlayer playing={true} loop={true} width='220px' height='124px' className={styles.image__card} url={props.movie.video} />
                    </Link>
                )
                }
                <div className={styles.bar__info}>
                    <div className={styles.button__info}>
                        <div className={styles.first_button}>
                            <button className='btn_around btn_around_white' onClick={() => router.push('/watch')}><img src={play.src} alt="" /></button>
                            <AddWish id={props.movie.id} />
                            <button className='btn_around btn_around_black' onClick={() => router.push('/watch')}><img src={aime.src} alt="" /></button>
                        </div>
                        <div>
                            <button className='btn_around btn_around_black' onClick={() => router.push({
                                pathname: `${router.pathname}`,
                                query: {
                                    ...router.query,
                                    id: props.movie.id
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
                                <p key={categ.id}>&nbsp;&nbsp;{categ.name}&nbsp;&nbsp;●</p>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.replace__info}></div>
            </div>
        </div>

    );
};

export default Card;