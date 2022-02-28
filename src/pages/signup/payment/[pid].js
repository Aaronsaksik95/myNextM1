import React, { useState, useEffect } from 'react';
import axios from 'axios';
import nextConfig from "../../../../next.config"
import authService from "../../../services/auth.service";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withNotSub from "../../../HOC/withNotSub";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardInput from '../../../components/stripe/CardInput';
import Message from '../../../components/UI/Message/Message';
import { useRouter } from 'next/router'
import styles from './index.module.scss'

const Payment = () => {
  const router = useRouter()
  const [message, setMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { pid } = router.query

  const getUser = () => {
    const token = localStorage.getItem("token")
    authService
      .getUser(token)
      .then((data) => {
        handleSubmitSub(data.user, token)
        setMessage("Patientez, vous allez être redigé...")
      })
      .catch((err) => console.log(err));
  }

  const handleSubmitSub = async (user, token) => {

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: user.email,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const res = await axios.post(`${nextConfig.env.API_URL}stripe/sub`, {
        'payment_method': result.paymentMethod.id,
        'email': user.email,
        'price': pid
      },
        {
          headers: {
            "authorization": token,
            "content-type": "application/json"
          },
        }

      );
      const { client_secret, status } = res.data;

      if (status === 'requires_action') {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            setMessage("Une erreur est survenue")
            console.log(result.error);
          } else {
            location.reload();
          }
        });
      } else {
        location.reload();
      }
    }
  };

  return (
    <div className={styles.payment}>
      <p className={styles.state}>ÉTAPE <strong>3</strong> SUR <strong>3</strong></p>
      <h2 className={styles.title__info}>Configurez votre carte de paiement</h2>
      <div className={styles.img__card}>
        <img src='https://assets.nflxext.com/ffe/siteui/acquisition/payment/svg/visa-v3.svg' />
        <img src='https://assets.nflxext.com/ffe/siteui/acquisition/payment/svg/mastercard-v2.svg' />
        <img src='https://assets.nflxext.com/ffe/siteui/acquisition/payment/svg/amex-v2.svg' />
        <img src='https://assets.nflxext.com/ffe/siteui/acquisition/payment/icon_cartes_bancaires_2x.png' />
      </div>
      <Card>
        <CardContent>
          <CardInput />
          <div>
            <button className='btn btn-red-long' onClick={getUser}>
              Activer mon abonnement payant
            </button>
          </div>
        </CardContent>
      </Card>
      <Message title={message} type="error" />
    </div>
  );
}

export default withNotSub(Payment);
