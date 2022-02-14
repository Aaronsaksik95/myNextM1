import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import styles from "./HeaderMenu.module.scss";
import authService from "../../../services/auth.service";

const Headermenu = () => {
    const [verify, setVerify] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        authService
            .verifyToken(token)
            .then((data) => {
                if (data.verify) {
                    if (data.isAdmin) {
                        setVerify(true);
                    }
                }
            })
    }, []);
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
                    {verify ? (
                        <li>
                            <Link href="/admin/newMovie">
                                <a>
                                    Admin
                                </a>
                            </Link>
                        </li>
                    ) : ""
                    }

                </ul>
            </nav>
        </div>
    );
}

export default Headermenu;
