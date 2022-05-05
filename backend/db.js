require('dotenv').config();
const mysql = require('mysql2');

// Connect to MySQL DB
const database = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
});

database.connect((err) => {
  if (err) throw err;
  console.log('Connected to DB!');
});

module.exports = database;
