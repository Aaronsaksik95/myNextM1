import React, { useEffect, useState } from 'react';
import HeaderLogo from '../../header/HeaderLogo/HeaderLogo';
import HeaderMenu from '../../header/HeaderMenu/HeaderMenu';
import HeaderToolbar from '../../header/HeaderToolbar/HeaderToolbar';
import styles from "./MainLayout.module.scss";
import Footer from '../../footer/Footer';
import { useRouter } from 'next/router';

const Mainlayout = ({ children }) => {
    const router = useRouter()
    const [classHeader, setClassHeader] = useState(`${styles.header__main}`);

    useEffect(() => {
        if (router.pathname.includes('/watch/')) {
            setClassHeader(`${styles.header__none}`);
        }
        else {
            setClassHeader(`${styles.header__main}`)
        }
    }, [router])

    const renderClass = () => {
        if (router.pathname == '/wish') {
            setClassHeader(`${styles.header__main}`);
        }
        else {
            setClassHeader(`${styles.header__main} ${styles.header__main_black}`);
        }
    }

    return (
        <div onWheel={renderClass}>
            <header className={classHeader}>
                <div className={styles.menu}>
                    <HeaderLogo />
                    <HeaderMenu />
                </div>
                <HeaderToolbar className={styles.toolbar} />
            </header>
            <main className={styles.body__main}>
                {children}
            </main>
            <footer className={styles.footer__main}>
                {/* <Footer/> */}
            </footer>
        </div>
    );
}

export default Mainlayout;
