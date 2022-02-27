import React, { useState, useEffect } from 'react';
import Link from "next/link";
import styles from "./HeaderHome.module.scss";
import authService from "../../../services/auth.service";
import { useRouter } from "next/router";
import LogoImg from "../../../../public/netflix.png";

const HeaderHome = () => {
    const router = useRouter();
    const [verify, setVerify] = useState(false);
    const logout = () => {
        localStorage.removeItem("token")
        router.push("/")
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        authService
            .verifyToken(token)
            .then((data) => {
                if (!data.verify) {
                    localStorage.removeItem("token");
                    setVerify(false);
                } else {
                    setVerify(true);
                }
            })
            .catch((err) => {
                setVerify(false);
            });
    }, [])


    return (
        <div className={styles.header__home}>
            <Link href="/">
                <img className={styles.header__logo} src={LogoImg.src} alt="Netflix" />
            </Link>
            {router.pathname != '/login' && (
                <div className={styles.header__btn}>
                    {!verify ? (
                        <Link href="/login">
                            <a className='btn btn-red'>
                                S&apos;identifier
                            </a>
                        </Link>
                    ) : (
                        <button className='btn btn-red' onClick={logout}>Se déconnecter</button>
                    )
                    }
                </div>
            )
            }

        </div>
    );
}

export default HeaderHome;
