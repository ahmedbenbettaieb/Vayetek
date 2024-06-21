import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user:'postgres', 
  host:'localhost',
  database:'games_management',
  password:'29061998', 
  port: 5433,
});

pool.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.stack);
  });




export default pool;
