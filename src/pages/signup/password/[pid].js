import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router'
import authService from "../../../services/auth.service";
import Button from '../../../components/UI/Button/Button';
import Message from '../../../components/UI/Message/Message';
import InputSignup from '../../../components/UI/InputSignup/InputSignup';
import withNotAuth from '../../../HOC/withNotAuth';
import styles from './index.module.scss'

const Password = () => {
    const router = useRouter()
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { pid } = router.query

    const loginUser = (e) => {
        e.preventDefault()
        authService.login(pid, password)
            .then(data => {
                if (data.auth) {
                    localStorage.setItem("token", data.token);
                    router.push('/signup/planform');
                }
                else {
                    setMessage(data.message);
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className={styles.password}>
            <p className={styles.state}>ÉTAPE <strong>1</strong> SUR <strong>3</strong></p>
            <h2 className={styles.title__info}>Ravis de vous revoir ! Inscrivez-vous, cela ne prendra que quelques minutes.</h2>
            <p className={styles.info}>Entrez votre mot de passe pour commencer à regarder vos films et séries préférés.</p>
            <p className={styles.info}>E-mail</p>
            <p className={styles.email}>{pid}</p>
            <form onSubmit={(e) => loginUser(e)}>

                <InputSignup
                    type="password"
                    placeholder="Mon mot de passe"
                    name="password"
                    id="password"
                    required={true}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <button type="submit" className="btn btn-red-long" >Suivant</button>
            </form>
            <Message title={message} type="error" />
        </div>
    );
}

export default withNotAuth(Password);
