// db connection is by using process.env
// create a .env file in your backend folder and store database name, database pwd & backend PORT
require('dotenv').config();
const mysql = require('mysql2');

// Connect to MySQL DB
const database = mysql.createConnection({
  host: 'localhost',
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
