import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://real-corgi-81.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret": "u57KqAFLkvWoV4PvOkbphvD551BTahqKZeIDMI7w3HLTyHaiH4TdP8fsjX2ifTda",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
