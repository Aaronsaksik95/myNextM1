import React from 'react';

import { getMovie } from "../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from './Detail.module.scss'

const Detail = () => {
    const router = useRouter()
    const params = router.query

    const { loading, error, data } = useQuery(getMovie, {
        variables: { id: params.id }
    });

    if (loading) {
        return "loading...";
    }

    if (error) {
        console.log(error);
        return null;
    }

    return (
        <div className={styles.product__detail}>
            <div>
                <Image
                    className={styles.image__product}
                    src={data.getMovie.image}
                    alt="Picture of the author"
                />
                <div>
                    <p className={styles.name__product}>{data.getMovie.name}</p>
                    <p className={styles.desc__product}>{data.getMovie.description}</p>
                </div>
            </div>
            <button className='btn btn-black' >Favori</button>
        </div>
    );
}

export default Detail;
