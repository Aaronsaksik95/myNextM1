import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { getMovie } from "../../graphql/queries/movies";
import React from 'react';
import ReactPlayer from 'react-player'
import styles from './index.module.scss'

const Index = () => {
    const router = useRouter()
    const { wid } = router.query

    const { loading, error, data } = useQuery(getMovie, {
        variables: { id: wid }
    });

    if (loading) {
        return "";
    }

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <div className={styles.video__screen}>
            <ReactPlayer controls={true} playing={true} loop={true} width='100%' height='100%' url={data.getMovie.video} />
        </div>
    );
};

export default Index;