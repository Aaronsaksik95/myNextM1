import React from 'react';
import HeaderHome from '../header/HeaderHome/HeaderHome';
import styles from "./HomeLayout.module.scss";
const Homelayout = ({children}) => {
    return (
        <>
            <header className={styles.header__main}>
                <HeaderHome/>
            </header>
            <main>
                {children}
            </main>
        </>
    );
}

export default Homelayout;
