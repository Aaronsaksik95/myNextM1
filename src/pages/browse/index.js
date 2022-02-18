import React, { useState, useEffect } from 'react';

import { getCategories } from "../../graphql/queries/categories";
import { useQuery } from "@apollo/react-hooks";
import MainGrid from '../../components/grid/mainGrid/MainGrid';
import styles from "./index.module.scss";
import withSub from "../../HOC/withSub";
import { useRouter } from 'next/router';
import Detail from '../../components/detail/Detail';
import CategoryBrowse from '../../components/category/categoryBrowse/CategoryBrowse';
import Link from 'next/link';

const Index = () => {
    const router = useRouter()
    var params = router.query

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
            {params.id ? (
                <Detail />
            ) : ""
            }
            <div className={styles.grid__shop}>
                {(() => {
                    switch (params.genre) {
                        case "movies": return params.category ? (
                            <MainGrid category={params.category} superSub={false} />
                        ) : (
                            data.getCategories.map((category) => (<MainGrid category={category} superSub={false} key={category.id} />))
                        )
                        case "series": return "#00FF00";
                        default: return (
                            data.getCategories.map((category) => (<MainGrid category={category} superSub={false} key={category.id} />))
                        );
                    }
                })()}
            </div>
        </div>
    );
}

export default withSub(Index);
