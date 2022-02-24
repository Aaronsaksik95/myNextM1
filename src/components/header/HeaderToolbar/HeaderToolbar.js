import React, { useState } from 'react';
// import Link from "next/link";
import Link from 'next/link';
import styles from "./HeaderToolbar.module.scss";
import { useRouter } from 'next/router';
import interro from '../../../../public/interro.png'
import profil from '../../../../public/profil.png'
import Search from '../../search/Search';

const Headertoolbar = () => {
    const router = useRouter()
    const [displayProfil, setDisplayProfil] = useState(false)
    const logout = () => {
        localStorage.removeItem("token")
        router.push("/")
    }
    return (
        <div>
            <div className={styles.header__toolbar}>
                <Search />
                <div className={styles.profil}>
                    <button className='btn_focus' onFocus={() => { setDisplayProfil(true) }} onBlur={() => { setTimeout(() => { setDisplayProfil(false) }, 100) }} >
                        <img src="https://occ-0-769-768.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFAjYfmW-pMf4eJv6L1h_-qrS69TJFXSqTTmir68XAraXSTUNv5jCnBmO9oenrpQyPKPk1sHlD2U3OxeW6rv8vqsYdg.png?r=c71" alt="" />
                    </button>
                </div>
                <p className={styles.arrow}>▼</p>
            </div>
            {displayProfil ? (
                <div className={styles.display__setting}>
                    <div className={styles.link__setting}>
                        <div>
                            <img className={styles.img__profil} src={profil.src} alt="" />
                            <Link href='/yourAccount'>
                                <a>Compte</a>
                            </Link>
                        </div>
                        <div>
                            <img className={styles.img__interro} src={interro.src} alt="" />
                            <a>Besoin d&apos;aide</a>
                        </div>
                    </div>
                    <div className={styles.div__logout}>
                        <button className='btn_text' onClick={logout}>Se déconnecter</button>
                    </div>
                </div>

            ) : ""
            }
        </div>

    );
}

export default Headertoolbar;
