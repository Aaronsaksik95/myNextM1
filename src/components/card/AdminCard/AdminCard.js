import React from 'react';
import styles from "./AdminCard.module.scss";
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player'
import { DELETE_MOVIE } from "../../../graphql/queries/movies";


const AdminCard = (props) => {
    const router = useRouter()

    const [deleteMovie, { data, loading, error }] = useMutation(DELETE_MOVIE);

    return (
        <div className={styles.card}>
            <img
                className={styles.image__card}
                src={props.movie.image}
                alt="Picture of the author"
            />
            <ReactPlayer playing={false} loop={true} width='158px' height='89px' className={styles.image__card} url={props.movie.video} />
            <p className={styles.name__card}>{props.movie.name}</p>
            <p className={styles.year__card}>{props.movie.year}</p>
            <p className={styles.time__card}>{props.movie.time}min</p>
            <p className={styles.desc__card}>{props.movie.description}</p>
            <div className={styles.actors}>
                {
                    props.movie.actor.map((item) => (
                        <p key={item} className={styles.actor}>{item}.</p>
                    ))
                }
            </div>
            <div className={styles.categories}>
                {
                    props.movie.category.map((item) => (
                        <p key={item.id} className={styles.category}>{item.name}.</p>
                    ))
                }
            </div>
            <div>
                <button className='btn btn-red'
                    onClick={() => {
                        deleteMovie({
                            variables: {
                                id: props.movie.id
                            }
                        });
                        location.reload()
                    }}>delete</button>
            </div>
        </div >

    );
};

export default AdminCard;