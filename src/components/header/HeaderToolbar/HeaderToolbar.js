import React, { useState } from 'react';
// import Link from "next/link";
import Link from 'next/link';
import styles from "./HeaderToolbar.module.scss";
import { useRouter } from 'next/router';
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
                    <button className='btn_focus' onFocus={() => { setDisplayProfil(true) }} onBlur={() => { setDisplayProfil(false) }} >
                        <img src="https://occ-0-769-768.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFAjYfmW-pMf4eJv6L1h_-qrS69TJFXSqTTmir68XAraXSTUNv5jCnBmO9oenrpQyPKPk1sHlD2U3OxeW6rv8vqsYdg.png?r=c71" alt="" />
                    </button>
                </div>
            </div>
            {displayProfil ? (
                <div>
                    <div>
                        <Link href={`/yourAccount`}>
                            <a>Compte</a>
                        </Link>
                    </div>
                    <div>
                        <button className='btn btn-black' onClick={logout}>Déconnexion</button>
                    </div>
                </div>

            ) : ""
            }
        </div>

    );
}

export default Headertoolbar;
