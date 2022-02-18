import React, { useEffect, useState } from 'react';

import { getSearchMovie } from "../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";
import SimpleGrid from '../../components/grid/simpleGrid/SimpleGrid';
import styles from "./index.module.scss";
import withSub from "../../HOC/withSub";
import { useRouter } from 'next/router';
import authService from '../../services/auth.service';

const Index = () => {
    var params = useRouter().query
    const [superSub, setSuperSub] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem("token")
        authService
            .verifyToken(token)
            .then((data) => {
                setSuperSub(data.superSub)
            })
    }, [])
    const { loading, error, data } = useQuery(getSearchMovie, {
        variables: { name: params.q, superSub: superSub }
    });

    if (loading) {
        return "loading...";
    }

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <div className={styles.shop}>
            <div className={styles.grid__shop}>
                <SimpleGrid movies={data.getSearchMovie} />
            </div>
        </div>
    );
}

export default withSub(Index);
