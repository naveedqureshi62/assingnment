const { Client } = require('pg');

const dbConfig = {
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  database: 'postgres',
  password: '8310',
};

const resolver = async (event) => {
  const client = new Client(dbConfig); // Create a new client instance
  try {
    await client.connect(); // Connect to the database
    const result = await client.query('SELECT * FROM customers');
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error('Error fetching customers:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching customers' }),
    };
  } finally {
    await client.end(); // Close the database connection
  }
};

module.exports = {
  handler: resolver
};
