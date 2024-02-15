const { ApolloServer, gql } = require('apollo-server-lambda');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { Client } = require('pg');
const { JSONResolver } = require('graphql-scalars');

// Define custom scalar type for JSON
const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'The JSON scalar type represents JSON objects as a string.',
  serialize(value) {
    return JSONResolver.serialize(value);
  },
  parseValue(value) {
    return JSONResolver.parseValue(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return JSONResolver.parseLiteral(ast);
    }
    return null;
  },
});

// Move database connection details to a separate configuration file
const dbConfig = {
  host: "localhost",
  port: 5433,
  user: "postgres",
  database: "postgres",
  password: "8310",
};

// GraphQL schema definition
const typeDefs = gql`
  scalar JSON

  type Customer {
    customer_id: ID
    customerdetails: JSON
  }

  type Query {
    getCustomer(customer_id: ID!): Customer
  }
`;

const resolvers = {
  JSON: JSONScalar, // Register custom scalar resolver
  Query: {
    getCustomer: async (_, { customer_id }) => {
      const pgClient = new Client(dbConfig);

      try {
        await pgClient.connect();
        const query = 'SELECT * FROM customers WHERE customer_id = $1';
        const result = await pgClient.query(query, [customer_id]);
        return result.rows[0];
      } catch (error) {
        console.error("Error fetching customer:", error.message);
        throw error;
      } finally {
        await pgClient.end();
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.graphqlHandler = server.createHandler();
