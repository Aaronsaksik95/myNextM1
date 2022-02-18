import React, { useState, useEffect } from 'react';

import { getCategories } from "../../graphql/queries/categories";
import { useQuery } from "@apollo/react-hooks";
import MainGrid from '../../components/grid/mainGrid/MainGrid';
import styles from "./index.module.scss";
import withSuperSub from "../../HOC/withSuperSub";
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
            {params.id ? (
                <Detail />
            ) : ""
            }
            <div className={styles.grid__shop}>
                {
                    data.getCategories.map((category) => (
                        <MainGrid category={category} superSub={true} key={category.id} />
                    ))
                }
            </div>
        </div>
    );
}

export default withSuperSub(Index);
