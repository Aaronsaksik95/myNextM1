// rsc
import '../styles/styles.scss'
import MainLayout from '../components/layouts/MainLayout';
import HomeLayout from '../components/layouts/HomeLayout'
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/apollo-client";
// import { UserContextProvider } from '../context/UserContext'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const stripePromise = loadStripe(process.env.PUBLIC_KEY_STRIPE);

  return (
    <ApolloProvider client={client}>
      {/* <UserContextProvider> */}
      {router.asPath == "/" || router.asPath.includes("/signup") ? (
        <HomeLayout>
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>
        </HomeLayout>
      ) : (
        <MainLayout>
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>
        </MainLayout>
      )
      }
      {/* </UserContextProvider> */}
    </ApolloProvider>
  )
}

export default MyApp
