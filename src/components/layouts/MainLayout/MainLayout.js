import React from 'react';
import HeaderLogo from '../../header/HeaderLogo/HeaderLogo';
import HeaderMenu from '../../header/HeaderMenu/HeaderMenu';
import HeaderToolbar from '../../header/HeaderToolbar/HeaderToolbar';
import HeaderAdmin from '../../header/HeaderAdmin/HeaderAdmin'
import styles from "./MainLayout.module.scss";
import Footer from '../../footer/Footer';
const Mainlayout = ({children}) => {
    return (
        <>
            <header className={styles.header__main}>
                <HeaderLogo />
                <HeaderMenu/>
                <HeaderToolbar/>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Mainlayout;
