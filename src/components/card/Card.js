import React from 'react';
import styles from "./Card.module.scss";
import Link from 'next/link'

const Card = (props) => {
    return (
        <div className={styles.card}>
            <div>
                <Link href={`/movie/${props.movie.id}`}>
                    <img
                        className={styles.image__card}
                        src={props.movie.image}
                        alt="Picture of the author"
                    />
                </Link>
                <div>
                    <p className={styles.name__card}>{props.movie.name}</p>
                    <p className={styles.desc__card}>{props.movie.description}</p>
                    {/* <p className={styles.price__card}>{props.movie.price} €</p> */}
                </div>
            </div>
        </div >

    );
};

export default Card;