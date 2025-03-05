const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST || 'db-service',
  database: 'mydb',
  password: 'mypassword',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`API running. DB time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('DB connection error');
  }
});

app.get('/health', (req, res) => res.status(200).send('OK'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));