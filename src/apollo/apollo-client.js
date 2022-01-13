import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: `${process.env.API_URL_GRAPHQL}graphql`,
    cache: new InMemoryCache()
})

export default client;