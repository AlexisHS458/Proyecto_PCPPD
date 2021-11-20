import { setContext } from "apollo-link-context";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "@apollo/client/core";



const httplink = createHttpLink({
  uri: "https://api.github.com/graphql"
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('github-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default  new ApolloClient({
  link: authLink.concat(httplink as any), 

  cache: new InMemoryCache(),
});
