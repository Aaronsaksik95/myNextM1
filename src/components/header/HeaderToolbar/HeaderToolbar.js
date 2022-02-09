import React, { useContext } from 'react';
// import Link from "next/link";
import styles from "./HeaderToolbar.module.scss";
import { useRouter } from 'next/router';

const Headertoolbar = () => {
    const router = useRouter()
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
