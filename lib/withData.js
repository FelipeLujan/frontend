import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";
import { LOCAL_STATE_QUERY } from "../components/Cart";

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    //local state
    clientState: {
      resolvers: {
        Mutation: {
          //  to toggle cartOpen we first need to get its current value from cache and then change it
          //  the way to get this variable from cache is with a graphQL query
          toggleCart(_, variables, { cache }) {
            const { cartOpen } = cache.readQuery({ query: LOCAL_STATE_QUERY });
            console.log("current cartOpen");
            const data = {
              data: {
                cartOpen: !cartOpen
              }
            };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: { cartOpen: false }
    }
  });
}

export default withApollo(createClient);
