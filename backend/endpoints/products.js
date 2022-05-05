const express = require('express');
const database = require('../db'); // connect to the database

const router = express.Router();
router.use(express.json());

//route to get all categories
router.get('/getAllCategories', (req, res) => {
  let query = `SELECT DISTINCT productCategory FROM products;`;
  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

module.exports = router;
