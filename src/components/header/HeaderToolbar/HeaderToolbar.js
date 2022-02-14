import React, { useState } from 'react';
// import Link from "next/link";
import Link from 'next/link';
import styles from "./HeaderToolbar.module.scss";
import { useRouter } from 'next/router';

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
                <div>
                    <input
                        type="text"
                        placeholder="Titres, personnes, genres"
                        name="search"
                        id="search"
                        onChange={(e) => {
                            router.push({
                                pathname: '/search',
                                query: { q: e.target.value },
                            })
                        }}
                    />
                </div>
                <div>
                    <button className='btn btn-black' onClick={() => {setDisplayProfil(true)}}>Profil</button>
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
