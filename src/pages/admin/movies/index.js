import React from 'react';

import CategoryBrowse from '../../../components/category/categoryBrowse/CategoryBrowse'
import { getCategories } from "../../../graphql/queries/categories";
import { useQuery } from "@apollo/react-hooks";
import AdminGrid from '../../../components/grid/adminGrid/AdminGrid';
import styles from "./index.module.scss";
import { useRouter } from 'next/router';
import withAdmin from '../../../HOC/withAdmin';

const Index = () => {
    const router = useRouter()
    var params = router.query

    // const { loading, error, data } = useQuery(getMovies, {
    //     variables: { category: params.category }
    // });

    // if (loading) {
    //     return "loading...";
    // }

    // if (error) {
    //     console.log(error);
    //     return null;
    // }
    const { loading, error, data } = useQuery(getCategories);
    if (loading) {
        return "loading...";
    }

    if (error) {
        console.log(error);
        return null;
    }
    return (
        <div className={styles.shop}>
            <CategoryBrowse />
            <div className={styles.grid__shop}>
                

                {(() => {
                    switch (router.pathname) {
                        case "/admin/movies": return params.category ? (
                            <AdminGrid category={params.category} />
                        ) : (
                            data.getCategories.map((category) => (<AdminGrid category={category} key={category.id}/>))
                        )

                        default: return "#FFFFFF";
                    }
                })()}
            </div>
        </div>
    );
}

export default withAdmin(Index);
