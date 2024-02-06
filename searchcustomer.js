const { ApolloServer, gql } = require('apollo-server-lambda');
const { Client } = require('pg');

const typeDefs = gql`
  type Customer {
    id: ID
    customerdetails: JSON
  } 
  
  type Query {
    getCustomer(id: ID!): Customer
    getAllCustomers: [Customer]
  }
`;

const resolvers = {
  Query: {
    getCustomer: async (_, { id }) => {
      const pgClient = new Client({
        host: "localhost",
        port: "5433",
        user: "postgres",
        database: "postgres",
        password: "8310"
      });

      await pgClient.connect();

      const result = await pgClient.query('SELECT *  FROM customers WHERE id = $1', [id]);
      const customer = result.rows[0];

      pgClient.end();
      return customer;
    },

    getAllCustomers: async () => {
      const pgClient = new Client({
        host: "localhost",
        port: "5433",
        user: "postgres",
        database: "naveed",
        password: "8310"
      });

      await pgClient.connect();

      const result = await pgClient.query('SELECT id, customerdetails FROM customers');
      const customers = result.rows;

      pgClient.end();
      return customers;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports.graphqlHandler = server.createHandler();
