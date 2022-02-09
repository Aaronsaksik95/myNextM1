import React, { useContext } from 'react';
import Link from "next/link";
import styles from "./HeaderHome.module.scss";

const HeaderHome = () => {
    return (
        <div className={styles.header__toolbar}>
            <div>
                <Link href="/login">
                    <a className='btn btn-white'>
                        Login
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default HeaderHome;
