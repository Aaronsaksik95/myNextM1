import React, {useContext} from 'react';

import { getMovie } from "../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from 'next/router'
import styles from './mid.module.scss'
import wishContext from '../../context/WishContext'

const Product = () => {
    const router = useRouter()
    const { mid } = router.query
    const {addItem} = useContext(wishContext);

    const { loading, error, data } = useQuery(getMovie, {
        variables: { id: mid }
    });

    if (loading) {
        return "loading...";
    }

    if (error) {
        console.log(error);
        return null;
    }

    // const addWish = async (movie) => {
    //     wishService.add_wish(movie)
    // };

    return (
        <div className={styles.product__detail}>
            <div>
                <img
                    className={styles.image__product}
                    src={data.getMovie.image}
                    alt="Picture of the author"
                />
                <div>
                    <p className={styles.name__product}>{data.getMovie.name}</p>
                    <p className={styles.desc__product}>{data.getMovie.description}</p>
                    <p className={styles.price__product}>{data.getMovie.price} €</p>
                </div>
            </div>
            <button className='btn btn-black' onClick={()=>addItem(data.getMovie)}>Favori</button>
        </div>
    );
}

export default Product;
