import React, { useState } from "react";
import { useRouter } from "next/router";
import authService from "../../../services/auth.service";
import Message from "../../../components/UI/Message/Message";
import InputSignup from "../../../components/UI/InputSignup/InputSignup";
import styles from "./index.module.scss";
import withNotAuth from "../../../HOC/withNotAuth";

const Index = () => {
  const router = useRouter();
  const { eid } = router.query;
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    authService.register({
      email: eid,
      password: password
    })
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
    <div className={styles.regform}>
      <p className={styles.state}>ÉTAPE <strong>1</strong> SUR <strong>3</strong></p>
      <h2 className={styles.title__info}>Créez un mot de passe pour activer votre abonnement</h2>
      <p className={styles.info}>Plus que quelques étapes et c&apos;est fini !</p>
      <p className={styles.info}>Plus rien à remplir.</p>
      <p className={styles.info}>E-mail</p>
      <p className={styles.email}>{eid}</p>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <InputSignup
          type="password"
          id="password"
          name="password"
          placeholder="Mon mot de passe"
          required={true}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className={styles.remplissage}>Oui, envoyez-moi les offres spéciales de Netflix par E-mail</p>
        <button type="submit" className="btn btn-red-long" >Suivant</button>
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
