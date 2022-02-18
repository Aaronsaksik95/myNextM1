// rsc
import '../styles/styles.scss'
import MainLayout from '../components/layouts/MainLayout/MainLayout';
import HomeLayout from '../components/layouts/HomeLayout/HomeLayout'
import AdminLayout from '../components/layouts/AdminLayout/AdminLayout'
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/apollo-client";
// import { UserContextProvider } from '../context/UserContext'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const stripePromise = loadStripe(process.env.PUBLIC_KEY_STRIPE);
  if (router.pathname == "/" || router.pathname == "/login") {
    return (
      <ApolloProvider client={client}>
        {/* <UserContextProvider> */}
        <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
        {/* </UserContextProvider> */}
      </ApolloProvider>
    )
  }
  else if (router.pathname.includes("/signup")) {
    return (
      <ApolloProvider client={client}>
        <HomeLayout>
          <Elements stripe={stripePromise}>
            <Component {...pageProps} />
          </Elements>
        </HomeLayout>
      </ApolloProvider>
    )
  }
  else if (router.pathname.includes("/admin")) {
    return (
      <ApolloProvider client={client}>
        <MainLayout>
          <AdminLayout>
            <Elements stripe={stripePromise}>
              <Component {...pageProps} />
            </Elements>
          </AdminLayout>
        </MainLayout>
      </ApolloProvider>
    )
  }
  else {
    return (
      <ApolloProvider client={client}>
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
