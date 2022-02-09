import React from 'react';
import styles from "./Card.module.scss";
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image'

const Card = (props) => {
    const router = useRouter()
    var params = router.query
    return (
        <div className={styles.card}>
            <div>
                <Link href={{ pathname: '/browse', query: { genre: params.genre, id: props.movie.id } }}>
                    <Image
                        className={styles.image__card}
                        src={props.movie.image}
                        alt="Picture of the author"
                    />
                </Link>
                <div>
                    <p className={styles.name__card}>{props.movie.name}</p>
                    <p className={styles.desc__card}>{props.movie.description}</p>
                </div>
            </div>
        </div >

    );
};

export default Card;