import React from 'react';
import LogoImg from "../../../../public/netflix.png";
import styles from "./HeaderLogo.module.scss";
import Link from 'next/link';

const Headerlogo = () => {
    return (
        <div className={styles.header__logo}>
            <Link href="/browse">
                <img src={LogoImg.src} alt="Netflix" />
            </Link>
        </div>
    );
}

export default Headerlogo;
