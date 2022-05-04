const express = require('express');
const database = require('../db'); // connect to the database

const router = express.Router();
router.use(express.json());

// route to search by category selected in the dropdown - keyword is empty is this case
router.get('/searchByCategory', (req, res) => {
  const searchCategory = req.query.category;
  let query =
    `SELECT * FROM products WHERE productCategory = '` + searchCategory + `'`;
  database.query(query, (err, result) => {
    res.send(result);
  });
});

module.exports = router;
