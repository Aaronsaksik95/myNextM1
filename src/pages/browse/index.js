import React, { useState, useEffect } from 'react';

import { getCategories } from "../../graphql/queries/categories";
import { useQuery } from "@apollo/react-hooks";
import MainGrid from '../../components/grid/mainGrid/MainGrid';
import CategoryGrid from '../../components/grid/categoryGrid/CategoryGrid';
import styles from "./index.module.scss";
import withSub from "../../HOC/withSub";
import { useRouter } from 'next/router';
import Detail from '../../components/detail/Detail';
import CategoryBrowse from '../../components/category/categoryBrowse/CategoryBrowse';
import Presentation from '../../components/presentation/Presentation';

const Index = () => {
    const router = useRouter()
    var params = router.query

    const { loading, error, data } = useQuery(getCategories);
    if (loading) {
        return "";
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
                {(() => {
                    switch (params.genre) {
                        case "movies": return params.category ? (
                            <div className={styles.main__browse}>
                                <Presentation category={params.category} />
                                <CategoryBrowse titlePage="Films" />
                                <div className={styles.catalog__category}>
                                    <CategoryGrid category={params.category} superSub={false} />
                                </div>
                            </div>
                        ) : (
                            <div className={styles.main__browse}>
                                <Presentation />
                                <CategoryBrowse titlePage="Films" />
                                <div className={styles.catalog}>
                                    {data.getCategories.map((category) => (<MainGrid category={category} superSub={false} key={category.id} />))}
                                </div>
                            </div>

                        )
                        default: return (
                            <div className={styles.main__browse}>
                                <Presentation />
                                <div className={styles.catalog}>
                                    {data.getCategories.map((category) => (<MainGrid category={category} superSub={false} key={category.id} />))}
                                </div>
                            </div>
                        );
                    }
                })()}
            </div>
        </div>
    );
}

export default withSub(Index);
