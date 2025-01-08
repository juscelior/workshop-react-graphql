import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

// Link HTTP para queries e mutations
const httpLink = new HttpLink({
  uri: 'https://localhost:7051/graphql', // Altere para sua URL GraphQL HTTP
});

// Link WebSocket para subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://localhost:7051/graphql', // Altere para sua URL GraphQL WS
    //connectionParams: {
      //authToken: localStorage.getItem('token'), // Adicione parâmetros de autenticação, se necessário
    //},
  })
);

// Dividir tráfego entre HTTP e WebSocket
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Configurar Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
