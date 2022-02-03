// rsc
import '../styles/styles.scss'
import MainLayout from '../components/layouts/MainLayout';
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/apollo-client";
import { WishContextProvider } from '../context/WishContext'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function MyApp({ Component, pageProps }) {
  const stripePromise = loadStripe(process.env.PUBLIC_KEY_STRIPE);

  return (
    <ApolloProvider client={client}>
      <WishContextProvider>
        <MainLayout>
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>
        </MainLayout>
      </WishContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
