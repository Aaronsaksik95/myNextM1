import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from "./HeaderMenu.module.scss";
import authService from "../../../services/auth.service";

const Headermenu = () => {
    const [verifyAdmin, setVerifyAdmin] = useState(false);
    const [verifySuperSub, setVerifySuperSub] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        authService
            .verifyToken(token)
            .then((data) => {
                if (data.verify) {
                    if (data.isAdmin) {
                        setVerifyAdmin(true);
                    }
                    if (data.superSub) {
                        setVerifySuperSub(true)
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
                    {verifySuperSub ? (
                        <li>
                            <Link href="/browsePremium">
                                <a>
                                    Premium
                                </a>
                            </Link>
                        </li>
                    ) : ""
                    }
                    <li>
                        <Link href={{ pathname: '/browse', query: { genre: 'movies' } }}>
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
                    {verifyAdmin ? (
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
