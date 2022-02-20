import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Search.module.scss'
import searchIcon from '../../../public/search.png'


const Search = () => {
    const router = useRouter()
    const [display, setDisplay] = useState(false)

    function expand() {
        setDisplay(true);
        console.log("coucou")
    }

    function close() {
        setDisplay(false);
    }

    return (
        <div>
            {
                !display && (
                    <button onFocus={expand} className={styles.icon__search}>
                        <img src={searchIcon.src} alt="" />
                    </button>
                )}
            {
                display ? (
                    <div className={styles.search__bar}>
                        <button className={styles.icon__search_open}>
                            <img src={searchIcon.src} alt="" />
                        </button>
                        <input
                            autoFocus
                            onBlur={close}
                            type="text"
                            placeholder="Titres, personnes, genres"
                            name="search"
                            id="search"
                            onChange={(e) => {
                                if (router.pathname.includes('admin')) {
                                    router.push({
                                        pathname: '/admin/search',
                                        query: { q: e.target.value },
                                    })
                                }
                                else {
                                    router.push({
                                        pathname: '/search',
                                        query: { q: e.target.value },
                                    })
                                }
                            }}
                        />
                    </div>


                ) : ""
            }

        </div>
    );
};

export default Search;