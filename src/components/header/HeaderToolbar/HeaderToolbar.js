import React, { useContext } from 'react';
import Link from "next/link";
import styles from "./HeaderToolbar.module.scss";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from 'next/router';

const Headertoolbar = () => {
    const router = useRouter()

    const searchMovie = (value) => {
        const { loading, error, data } = useQuery(getCategories);
        if (loading) {
            return "loading...";
        }

        if (error) {
            console.log(error);
            return null;
        }
    }

    return (
        <div className={styles.header__toolbar}>
            <div>
                <input
                    type="text"
                    placeholder="Titres, personnes, genres"
                    name="search"
                    id="search"
                    onChange={(e) => {
                        router.push({
                            pathname: '/search',
                            query: { q: e.target.value },
                        })
                    }}
                />
            </div>
        </div>
    );
}

export default Headertoolbar;
