import React from 'react';
import Link from 'next/link';
import styles from "./HeaderMenu.module.scss";

const Headermenu = () => {
    return (
        <div className={styles.header__menu}>
            <nav>
                <ul>
                    <li>
                        <Link href="/browse">
                            <a>
                            Accueil
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={{ pathname: '/browse', query: { genre: 'series' } }}>
                            <a>
                            Séries
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={{ pathname: '/browse', query: { genre: 'movies' } }}>
                            <a>
                            Films
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/wish">
                            <a>
                            Ma liste
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Headermenu;
