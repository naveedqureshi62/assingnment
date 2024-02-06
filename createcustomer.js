const { ApolloServer, gql } = require('apollo-server-lambda');
const { Client } = require('pg');
const { GraphQLScalarType } = require('graphql');

const dbConfig = {
    host: "localhost",
    port: "5433",
    user: "postgres",
    database: "postgres",
    password: "8310"
};

// Define JSON scalar type
const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'The `JSON` scalar type represents JSON objects as a string.',
  serialize(value) {
    return JSON.stringify(value);
  },
  parseValue(value) {
    return JSON.parse(value);
  },
});

// GraphQL schema definition
const typeDefs = gql`
  scalar JSON

  type Customer {
    id: ID
    customerdetails: JSON
  }

  type Query {
    getAllCustomers: [Customer]
    getCustomer(id: ID!): Customer
  }

  type Mutation {
    addCustomer(id: ID!, customerdetails: JSON!): Customer
    updateCustomer(id: ID!, customerdetails: JSON!): Customer
    deleteCustomer(id: ID!): Boolean
  }
`;

const resolvers = {
  JSON: JSONScalar, // Register custom JSON scalar resolver

  Query: {
    getAllCustomers: async () => {
      const pgClient = new Client(dbConfig);

      try {
        await pgClient.connect();
        const result = await pgClient.query('SELECT *  FROM customers');
        return result.rows;
      } catch (error) {
        console.error("Error fetching customers:", error.message);
        throw error;
      } finally {
        await pgClient.end();
      }
    },
    getCustomer: async (_, { id }) => {
      const pgClient = new Client(dbConfig);

      try {
        await pgClient.connect();
        const result = await pgClient.query('SELECT * FROM customers WHERE id = $1', [id]);
        return result.rows[0];
      } catch (error) {
        console.error("Error fetching customer:", error.message);
        throw error;
      } finally {
        await pgClient.end();
      }
    },
  },

  Mutation: {
    addCustomer: async (_, { id, customerdetails }) => {
      const pgClient = new Client(dbConfig);

      try {
        await pgClient.connect();
        const query = 'INSERT INTO customers(id, customerdetails) VALUES($1, $2) RETURNING *';
        const values = [id, JSON.stringify(customerdetails)]; // Serialize JSON to string
        const result = await pgClient.query(query, values);
        return result.rows[0];
      } catch (error) {
        console.error("Error adding customers:", error.message);
        throw error;
      } finally {
        await pgClient.end();
      }
    },
    updateCustomer: async (_, { id, customerdetails }) => {
      const pgClient = new Client(dbConfig);

      try {
        await pgClient.connect();
        const query = 'UPDATE customers SET customerdetails = $1 WHERE id = $2 RETURNING *';
        const values = [JSON.stringify(customerdetails), id];
        const result = await pgClient.query(query, values);
        return result.rows[0];
      } catch (error) {
        console.error("Error updating customer:", error.message);
        throw error;
      } finally {
        await pgClient.end();
      }
    },
    deleteCustomer: async (_, { id }) => {
      const pgClient = new Client(dbConfig);

      try {
        await pgClient.connect();
        const query = 'DELETE FROM customers WHERE id = $1';
        await pgClient.query(query, [id]);
        return true;
      } catch (error) {
        console.error("Error deleting customer:", error.message);
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
