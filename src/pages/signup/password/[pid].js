import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router'
import authService from "../../../services/auth.service";
import Button from '../../../components/UI/Button/Button';
import Message from '../../../components/UI/Message/Message';
import Input from '../../../components/UI/Input/Input';
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
        <div className={styles.form__password}>
            <p>{pid}</p>
            <form onSubmit={(e) => loginUser(e)}>

                <Input
                    label="Mot de passe"
                    type="password"
                    placeholder="Mon mot de passe"
                    name="password"
                    id="password"
                    required={true}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <Button className="btn btn-white" title="Connexion" />
            </form>
            <Message title={message} type="error" />
        </div>
    );
}

export default withNotAuth(Password);
