import React from 'react';
import { useRouter } from 'next/router';
import styles from './Search.module.scss'


const Search = () => {
    const router = useRouter()
    // var params = router.query


    return (
        <div>
            <input
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
    );
};

export default Search;