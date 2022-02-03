import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import nextConfig from '../../next.config';

// const client = new ApolloClient({
//     uri: `${nextConfig.env.API_URL_GRAPHQL}graphql`,
//     cache: new InMemoryCache()
// })

const httpLink = createHttpLink({
    uri: `${nextConfig.env.API_URL_GRAPHQL}graphql`,
});

const authLink = setContext(() => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            token: token,
        }
    }
});
console.log(httpLink)
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client;