const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const { InMemoryCache } = require("apollo-cache-inmemory");

// const { makeSchema } = require("../lib/schema");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "hasura", url: process.env.GQL_URI }
    // Define additional services here
  ]
});

const Graphql = () => {
  const gql = new ApolloServer({
    gateway,
    playground: true,
    introspection: true,
    cache: new InMemoryCache(),
    // Disable subscriptions (not currently supported with ApolloGateway)
    subscriptions: false
  });
  return gql.getMiddleware({
    path: "/graphql" // defaults to `/graphql` itself,
  });
};

// const Graphql = () => {
//   const graphql = new ApolloServer({
//     schema: makeSchema(),
//     playground: true,
//     introspection: true,
//     cache: new InMemoryCache()
//   });

// };

const gqlRoute = Graphql();

module.exports = gqlRoute;
