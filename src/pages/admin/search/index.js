import React from 'react';

import { getSearchMovie } from "../../../graphql/queries/movies";
import { useQuery } from "@apollo/react-hooks";
import AdminGridSearch from '../../../components/grid/adminGridSearch/AdminGridSearch';
import styles from "./index.module.scss";
import withAdmin from "../../../HOC/withAdmin";
import { useRouter } from 'next/router';

const Index = () => {
    var params = useRouter().query

    const { loading, error, data } = useQuery(getSearchMovie, {
        variables: { name: params.q }
    });

    if (loading) {
        return "";
    }

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <div className={styles.shop}>
            <div className={styles.grid__shop}>
                <AdminGridSearch movies={data.getSearchMovie} />
            </div>
        </div>
    );
}

export default withAdmin(Index);
