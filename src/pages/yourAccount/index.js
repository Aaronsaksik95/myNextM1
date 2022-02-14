import React, { useEffect, useState } from "react";
import TitlePage from "../../components/UI/Title/TitlePage";
import authService from "../../services/auth.service";
import stripeService from "../../services/stripe.service";
import Input from "../../components/UI/Input/Input";
import styles from "./index.module.scss";
import Message from "../../components/UI/Message/Message";
import withSub from "../../HOC/withSub";
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter()
    const [user, setUser] = useState({});
    const [success, setSuccess] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        authService
            .updateUser(token, user)
            .then((data) => {
                setSuccess(true);
                setUser(data.user);
            })
            .catch((err) => console.log(err));
    };

    const unSub = () => {
        const token = localStorage.getItem("token");
        stripeService
            .deleteSub(token)
            .then((data) => {
                if (data.deleted) {
                    router.push("/signup/planform")
                }
            })

    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        authService
            .getUser(token)
            .then((data) => {
                setUser(data.user);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <TitlePage title="mon compte" />
            <button onClick={unSub}>Annuler mon abonnement</button>
            <form className={styles.form__profil} onSubmit={(e) => handleSubmit(e)}>
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={(user && user.email)}
                    onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                    }}
                />
                {/* {console.log(user.email, "cou")} */}
                <input type="submit" className="btn btn-black" />
                {success ? (
                    <Message type="success" message="votre profil a bien été modifié" />
                ) : ""
                }
            </form>
        </div>
    );
};

export default withSub(Index);
