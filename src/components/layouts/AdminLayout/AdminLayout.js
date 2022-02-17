import React from 'react';
import HeaderAdmin from '../../header/HeaderAdmin/HeaderAdmin';
import styles from "./AdminLayout.module.scss";
const Homelayout = ({children}) => {
    return (
        <>
            <header className={styles.header__main}>
                <HeaderAdmin/>
            </header>
            <main>
                {children}
            </main>
        </>
    );
}

export default Homelayout;
