import React, { useEffect, useState } from "react";
import TitlePages from "../../../components/UI/Title/TitlePages";
import authService from "../../../services/auth.service";
import Input from "../../../components/UI/Input/Input";
import styles from "./index.module.scss";
import Message from "../../../components/UI/Message/Message";
import withAuth from "../../../HOC/withAuth";
const Index = () => {
    const [user, setUser] = useState({});
    const [success, setSuccess] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        authService
            .updateUser(token, user)
            .then((data) => {
                console.log(data);
                setSuccess(true);
                setUser(data.user);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        authService
            .getUser(token)
            .then((data) => {
                setUser(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <TitlePages title="mon compte" />
            <form className={styles.form__profil} onSubmit={(e) => handleSubmit(e)}>
                <Input
                    label="Prénom"
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={(user && user.firstname) || ""}
                    onChange={(e) => {
                        setUser({ ...user, firstname: e.target.value });
                    }}
                />
                <Input
                    label="Nom"
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={(user && user.lastname) || ""}
                    onChange={(e) => {
                        setUser({ ...user, lastname: e.target.value });
                    }}
                />
                <Input
                    label="Email"
                    type="text"
                    id="email"
                    name="email"
                    value={(user && user.email) || ""}
                    onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                    }}
                />
                <input type="submit" className="btn btn-black" />
                {success ? (
                    <Message type="success" message="votre profil a bien été modifié" />
                ) : ""
                }
            </form>
        </div>
    );
};

export default withAuth(Index);
