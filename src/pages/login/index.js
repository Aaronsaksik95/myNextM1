import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Input from '../../components/UI/Input/Input';
import TitlePage from '../../components/UI/Title/TitlePage';
import Button from '../../components/UI/Button/Button';
import Message from '../../components/UI/Message/Message';

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
                    router.push('/account/profil');
                }
                else {
                    setMessage(data.message);
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <TitlePage title="Connexion" />
            <form onSubmit={(e) => loginUser(e)}>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Mon email"
                    name="email"
                    id="email"
                    required={true}
                    onChange={(e) => {
                        setUser({ ...user, email: e.target.value })
                    }}
                />
                <Input
                    label="Mot de passe"
                    type="password"
                    placeholder="Mon mot de passe"
                    name="password"
                    id="password"
                    required={true}
                    onChange={(e) => {
                        setUser({ ...user, password: e.target.value })
                    }}
                />
                <Button className="btn btn-white" title="Connexion" />
            </form>
            <Message title={message} type="error"/>
        </div>
    );
}

export default Index;
