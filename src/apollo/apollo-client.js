import { ApolloClient, InMemoryCache } from '@apollo/client';
import nextConfig from '../../next.config';

const client = new ApolloClient({
    uri: `${nextConfig.env.API_URL_GRAPHQL}graphql`,
    cache: new InMemoryCache()
})

export default client;