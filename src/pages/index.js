import React, { useState } from 'react';
import Input from '../components/UI/Input/Input'
import authService from "../services/auth.service";
import withNotAuth from '../HOC/withNotAuth';
import { useRouter } from "next/router";
import styles from './index.module.scss'

function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.getUserEmail(email)
      .then((data) => {
        if (data.response) {
          if (data.user.isSub) {
            router.push(`/login`);
          }
          else {
            router.push(`/signup/password/${data.user.email}`);
          }
        }
        else {
          router.push(`/signup/regform`);
        }
      })
  }

  return (
    <div>
      <img className={styles.img_bgd} src="https://assets.nflxext.com/ffe/siteui/vlv3/ed0b5df9-ba9d-4534-bd09-57993daeda56/7dc5b2df-2490-4403-a700-fb5dc0d4df57/FR-fr-20220214-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
      <div className={styles.form__home}>
        <h1 className={styles.title__h1}>Films, séries TV et bien plus en illimité.</h1>
        <p className={styles.subtitle}>Où que vous soyez. Annulez à tout moment.</p>
        <p className={styles.subtitle__bis}>Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous abonner ou réactiver votre abonnement.</p>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            placeholder="Adresse e-mail"
            name="email"
            id="email"
            required
            className={styles.input__home}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          >
          </input>
          <button type="submit" className={styles.btn__home}>Commencer &nbsp;&rsaquo;</button>
        </form>
      </div>
    </div>

  );
}

export default withNotAuth(Home);