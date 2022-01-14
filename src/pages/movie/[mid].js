import React from 'react';

import { getMovie } from "../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from 'next/router'
import { loadStripe } from "@stripe/stripe-js";
import nextConfig from '../../../next.config';
import styles from './mid.module.scss'
import stripeService from '../../services/stripe.service'


const Product = () => {
    const router = useRouter()
    const { mid } = router.query

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
    console.log(data);

    const stripePromise = loadStripe(nextConfig.env.PUBLIC_KEY_STRIPE);

    const handleConfirmation = async () => {
        try {
            const stripe = await stripePromise;
            const response = await stripeService.createSession({
                amount: data.getMovie.price * 100,
            });
            await stripe.redirectToCheckout({
                sessionId: response.id,
            });
        } catch (error) {
            console.log(error);
        }
    };

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
            <button className='btn btn-black' onClick={handleConfirmation}>Acheter</button>
        </div>
    );
}

export default Product;
