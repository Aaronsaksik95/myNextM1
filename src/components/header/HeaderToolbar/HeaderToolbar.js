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
                <div>
                    <button className='btn btn-black' onClick={() => { setDisplayProfil(true) }}>Profil</button>
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
