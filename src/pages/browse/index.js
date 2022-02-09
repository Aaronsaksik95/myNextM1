import React, { useState, useEffect } from 'react';

import { getCategories } from "../../graphql/queries/categories";
import { useQuery } from "@apollo/react-hooks";
import MainGrid from '../../components/grid/mainGrid/MainGrid';
import styles from "./index.module.scss";
import withSub from "../../HOC/withSub";
import { useRouter } from 'next/router';
import Detail from '../../components/detail/Detail';
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

            {params.genre ? (
                <select name="categories" id="categories-select">
                    {
                        data.getCategories.map((category) => (
                            <option value={category.name} key={category.id}>
                                <Link href={{ pathname: '/browse', query: { genre: params.genre, category: category.id } }}>
                                    <a>{category.name}</a>
                                </Link>
                            </option>
                        ))
                    }
                </select>
            ) : ""
            }

            {params.id ? (
                <Detail />
            ) : ""
            }
            <div className={styles.grid__shop}>
                {(() => {
                    switch (params.genre) {
                        case "movies": return data.getCategories.map((category) => (<MainGrid category={category} key={category.id} />))
                        case "series": return "#00FF00";
                        default: return "#FFFFFF";
                    }
                })()}
            </div>
        </div>
    );
}

export default withSub(Index);
