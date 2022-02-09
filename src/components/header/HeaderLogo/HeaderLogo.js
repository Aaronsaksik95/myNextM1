import React from 'react';
import LogoImg from "../../../../public/nike.png";
import Image from 'next/image'
import styles from "./HeaderLogo.module.scss";

const Headerlogo = () => {
    return (
        <div className={styles.header__logo}>
            <Image src={LogoImg.src} alt="Nike"/>
        </div>
    );
}

export default Headerlogo;
