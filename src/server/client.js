import { ApolloClient, InMemoryCache } from '@apollo/client';
const BASE_URL = 'http://localhost:9000/';

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

export default client;