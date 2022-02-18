import React from 'react';
import HeaderAdmin from '../../header/HeaderAdmin/HeaderAdmin';
import styles from "./AdminLayout.module.scss";
import withAdmin from '../../../HOC/withAdmin';
const AdminLayout = ({children}) => {
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

export default AdminLayout;
