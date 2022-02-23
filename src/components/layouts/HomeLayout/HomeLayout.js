import { useRouter } from 'next/router';
import React from 'react';
import HeaderHome from '../../header/HeaderHome/HeaderHome';
import styles from "./HomeLayout.module.scss";

const Homelayout = ({ children }) => {
    return (
        <>
            <header className={styles.header__home}>
                <HeaderHome />
            </header>
            <main>
                {children}
            </main>
        </>
    );
}

export default Homelayout;
