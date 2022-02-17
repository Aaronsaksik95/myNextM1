import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from "./HeaderAdmin.module.scss";
import Search from '../../search/Search';
import withAdmin from '../../../HOC/withAdmin';

const Headermenu = () => {
    return (

        <div className={styles.header__menu}>
            <nav>
                <ul>
                    <li>
                        <Link href="/admin/newCategory">
                            <a>
                                Ajouter une catégorie
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/newMovie">
                            <a>
                                Ajouter un film
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/newMovie">
                            <a>
                                Ajouter une série
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/admin/movies'>
                            <a>
                                Films
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/series">
                            <a>
                                Séries
                            </a>
                        </Link>
                    </li>
                    <Search />
                </ul>
            </nav>
        </div >

    );
}

export default withAdmin(Headermenu);
