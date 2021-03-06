// rsc
import '../styles/styles.scss'
import MainLayout from '../components/layouts/MainLayout/MainLayout';
import HomeLayout from '../components/layouts/HomeLayout/HomeLayout'
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/apollo-client";
// import { UserContextProvider } from '../context/UserContext'
import Head from 'next/head';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const stripePromise = loadStripe(process.env.PUBLIC_KEY_STRIPE);

  if (router.pathname == "/" || router.pathname.includes("/signup") || router.pathname == "/login") {
    return (
      <ApolloProvider client={client}>
        <Head>
          <title>Auth - Netflix</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <UserContextProvider> */}
        <HomeLayout>
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>
        </HomeLayout>
        {/* </UserContextProvider> */}
      </ApolloProvider>
    )
  }
  else {
    return (
      <ApolloProvider client={client}>
        <Head>
          <title>Films - Netflix</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>
        </MainLayout>
      </ApolloProvider>
    )
  }

}

export default MyApp
