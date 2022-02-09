import React, { useState, useEffect } from 'react';
import axios from 'axios';
import nextConfig from "../../../../next.config"
import authService from "../../../services/auth.service";
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withNotSub from "../../../HOC/withNotSub";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { makeStyles } from '@material-ui/core/styles';
import CardInput from '../../../components/stripe/CardInput';
import Message from '../../../components/UI/Message/Message';
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '35vh auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
  },
});

const Payment = () => {
  const router = useRouter()
  const classes = useStyles();
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
            router.push("/browse");
          }
        });
      } else {
        router.push("/browse");
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Create Next Appp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <CardInput />
          <div className={classes.div}>
            <Button variant="contained" color="primary" className={classes.button} onClick={getUser}>
              Subscription
            </Button>
          </div>
        </CardContent>
      </Card>
      <Message title={message} type="error"/>
    </div>
  );
}

export default withNotSub(Payment);
