import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Input from '../../components/UI/Input/Input';
import styles from './index.module.scss'
import Button from '../../components/UI/Button/Button';
import Message from '../../components/UI/Message/Message';
import Link from 'next/link';

const Index = () => {
    const router = useRouter()
    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    const loginUser = (e) => {
        e.preventDefault()
        fetch(`${process.env.API_URL}users/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.auth) {
                    localStorage.setItem("token", data.token);
                    router.push('/browse');
                }
                else {
                    setMessage(data.message);
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <img className={styles.img_bgd} src="https://assets.nflxext.com/ffe/siteui/vlv3/ed0b5df9-ba9d-4534-bd09-57993daeda56/7dc5b2df-2490-4403-a700-fb5dc0d4df57/FR-fr-20220214-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />

            <div className={styles.form__login}>
                <h1 className={styles.title__login}>S&apos;identifier</h1>
                <form className={styles.form} onSubmit={(e) => loginUser(e)}>
                    <Input
                        type="email"
                        placeholder="E-mail ou numéro de téléphone"
                        name="email"
                        id="email"
                        required={true}
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value })
                        }}
                    />
                    <Input
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        id="password"
                        required={true}
                        onChange={(e) => {
                            setUser({ ...user, password: e.target.value })
                        }}
                    />
                    <button className="btn btn-red-long" >S&apos;identifier</button>
                </form>
                <div className={styles.link__sign}>
                    <p>Première visite sur Netflix ?
                        <Link href="/">
                            <a>Inscrivez-vous</a>
                        </Link>
                    </p>
                </div>
                <div className={styles.comment}>
                    <p>Cette page est protégée par Google reCAPTCHA pour nous assurer que vous n&apos;êtes pas un robot. <span>En savoir plus.</span></p>
                </div>
            </div>
        </div>
    );
}

export default Index;
