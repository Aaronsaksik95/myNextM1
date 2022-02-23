import React, { useEffect, useState } from 'react';
import styles from './Presentation.module.scss'
import { getMovieNewest } from '../../graphql/queries/movies';
import { useQuery } from "@apollo/react-hooks";
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player'
import Play from '../UI/Button/Play/Play';

const Presentation = (props) => {
    const router = useRouter()
    const [superSub, setSuperSub] = useState(false)
    const [video, setVideo] = useState(false)
    useEffect(() => {
        router.pathname == '/browse' ? setSuperSub(false) : setSuperSub(true)
        // setTimeout(() => {
        //     setVideo(true)
        // }, 3000)
    }, [])


    const { loading, error, data } = useQuery(getMovieNewest, {
        variables: { superSub: superSub, category: props.category }
    });
    if (loading) {
        return "";
    }

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <div>
            <div className={styles.pres}>
                {video ? (
                    <ReactPlayer playing={true} loop={true} width='100%' height='750px' url={data.getMovieNewest.video} />
                ) : (
                    <img className={styles.image__pres} src={data.getMovieNewest.image} alt="" />

                )
                }

                <div className={styles.text__pres}>
                    <h1 className={styles.title__pres}>{data.getMovieNewest.name}</h1>
                    <h3 className={styles.desc__pres}>{data.getMovieNewest.description}</h3>
                    <div className={styles.button__pres}>
                        <Play />
                        <Link href={{ pathname: `${router.pathname}`, query: { ...router.query, id: data.getMovieNewest.id } }}>
                            <a className="btn btn-muted">  <span className={styles.icon}>ⓘ&nbsp;&nbsp;</span>Plus d&lsquo;infos</a>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Presentation;