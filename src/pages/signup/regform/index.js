import React, { useState } from "react";
import { useRouter } from "next/router";
import authService from "../../../services/auth.service";
import TitlePage from "../../../components/UI/Title/TitlePage";
import Message from "../../../components/UI/Message/Message";
import Input from "../../../components/UI/Input/Input";
import styles from "./index.module.scss";
import withNotAuth from "../../../HOC/withNotAuth";

const Index = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    authService.register(user)
      .then((data) => {
        if (data.message) {
          setError(true);
          setErrorMessage(data.message);
          return false;
        }
        localStorage.setItem("token", data.token);
        router.push('/signup/planform');
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message)
      });
  };

  return (
    <div className="page__register">
      <TitlePage title="Inscription" />
      <p className="text-center">
        Inscrivez vous pour vous connecter à votre profil
      </p>
      <form className={styles.form__register} onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="email"
          label="Email"
          id="email"
          name="email"
          placeholder="Mon email"
          required={true}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <Input
          type="password"
          label="Mot de passe"
          id="password"
          name="password"
          placeholder="Mon mot de passe"
          required={true}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <input className="btn btn-black" type="submit" value="M'inscrire" />
        {
          error ? (
            <Message message={errorMessage} type="error" />
          )
            :
            ""
        }
      </form>
    </div>
  );
};

export default withNotAuth(Index);
