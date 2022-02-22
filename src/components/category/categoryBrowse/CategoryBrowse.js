import React, { useState } from 'react';

import { getCategories } from "../../../graphql/queries/categories";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from 'next/router';
import styles from "./Category.module.scss";



const CategoryBrowse = (props) => {
    const router = useRouter()
    var params = router.query
    const [display, setDisplay] = useState(false)
    const { loading, error, data } = useQuery(getCategories);
    if (loading) {
        return "";
    }

    if (error) {
        console.log(error);
        return null;
    }

    const displayListCateg = () => {
        setDisplay(true)
    }

    const chooseCategory = (category) => {
        if (router.pathname == "/admin/movies") {
            router.push({
                pathname: '/admin/movies',
                query: {
                    category: category
                },
            })
        }
        else {
            router.push({
                pathname: '/browse',
                query: {
                    genre: params.genre,
                    category: category
                },
            })
        }
    }

    return (
        <div>
            {
                // params.genre ? (
                    <div>
                        <p className={styles.button__categ} onClick={displayListCateg}>Category</p>
                        {
                            display ? (
                                <div>
                                    {
                                        data.getCategories.map((category) => (
                                            <p value={JSON.stringify(category)} key={category.id} onClick={() => chooseCategory(category.id)} >
                                                {category.name}
                                            </p>
                                        ))
                                    }
                                </div>
                            ) : ""
                        }
                    </div>
                // ) : ""
            }
        </div>
    );
};

export default CategoryBrowse;