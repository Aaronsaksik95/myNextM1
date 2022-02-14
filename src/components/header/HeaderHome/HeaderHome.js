import React, { useState, useEffect } from 'react';
import Link from "next/link";
import styles from "./HeaderHome.module.scss";
import authService from "../../../services/auth.service";
import { useRouter } from "next/router";

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
        <div className={styles.header__toolbar}>
            <div>
                {!verify ? (
                    <Link href="/login">
                        <a className='btn btn-white'>
                            Login
                        </a>
                    </Link>
                ) : (
                    <button className='btn btn-black' onClick={logout}>Déconnexion</button>
                )
                }

            </div>
        </div>
    );
}

export default HeaderHome;
