import React, { useEffect, useState } from 'react';

import { getMovie } from "../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import styles from './Detail.module.scss'
import Play from '../UI/Button/Play/Play'
import aime from '../../../public/aime.png'
import AddWish from '../UI/Button/AddWish/AddWish';
import Link from 'next/link';
import DetailGrid from '../grid/detailGrid/DetailGrid';

const Detail = (props) => {
    const router = useRouter()
    const params = router.query

    const { loading, error, data } = useQuery(getMovie, {
        variables: { id: params.id }
    });

    if (loading) {
        return "";
    }

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <>
            <div onClick={() => router.push(router.pathname)} className={styles.overlay}></div>
            <div className={styles.movie__detail}>
                <div>
                    <Link href={{ pathname: `${router.pathname}`, query: { ...router.query, id: data.getMovie.id } }}>
                        <ReactPlayer playing={true} loop={true} width='100%' height='450px' url={data.getMovie.video} />
                    </Link>
                    <div onClick={() => router.push(router.pathname)} className={styles.close__button}>
                        <p className='btn_around btn_around_black_not_border'>X</p>
                    </div>
                    <p className={styles.name__movie}>{data.getMovie.name}</p>
                    <div className={styles.button__info}>
                        <Play />
                        <div className={styles.second_button}>
                            <AddWish id={params.id} />
                            <button className='btn_around btn_around_black' onClick={() => router.push('/watch')}><img src={aime.src} alt="" /></button>
                        </div>
                    </div>
                    <div className={styles.all_info__movie}>
                        <div className={styles.movie__info}>
                            <div className={styles.info}>
                                <div className={styles.reco}>
                                    Recommandé à 98 %
                                </div>
                                <div>
                                    {data.getMovie.year}
                                </div>
                                <div className={styles.age}>
                                    <p>13+</p>
                                </div>
                                <div>
                                    {data.getMovie.time} min
                                </div>
                            </div>
                            <div>
                                <p className={styles.desc__movie}>{data.getMovie.description}</p>
                            </div>
                        </div>
                        <div className={styles.actor__category}>
                            <div className={styles.actor}>
                                <p className={styles.title}>Distribution : </p>
                                {
                                    data.getMovie.actor.map((item) => (
                                        <p key={item}>{item}, </p>
                                    ))
                                }
                            </div>
                            <div className={styles.category}>
                                <p className={styles.title}>Genres : </p>
                                {
                                    data.getMovie.category.map((item) => (
                                        <p key={item.id}>{item.name}, </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.similary}>
                        <DetailGrid
                            category={data.getMovie.category[Math.floor(Math.random() * data.getMovie.category.length)].id}
                            superSub={router.asPath == '/browsePremium' ? true : false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
