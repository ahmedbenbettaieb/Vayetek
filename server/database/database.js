import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

// Load environment variables from .env file
dotenv.config();

// Create a new pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.stack);
  });

export default pool;
