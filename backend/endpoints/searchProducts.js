const express = require('express');
const database = require('../db'); // connect to the database

const router = express.Router();
router.use(express.json());

// route to search by category selected in the dropdown - keyword is empty is this case
router.get('/searchGetAllProducts', (req, res) => {
  let query = `SELECT * FROM products`;
  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// route to search by category selected in the dropdown - keyword is empty is this case
router.get('/searchByCategory', (req, res) => {
  const searchCategory = req.query.category;
  let query =
    `SELECT * FROM products WHERE productCategory = '` + searchCategory + `'`;
  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// route to search by keyword entered in the text field - category is 'All Products' in this case
router.get('/searchByKeyword', (req, res) => {
  const searchKeyword = req.query.keyword;
  let query =
    `SELECT * FROM products WHERE productDescription LIKE '%` +
    searchKeyword +
    `%' OR productName LIKE '%` +
    searchKeyword +
    `%'`;
  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// route to search by both Catgeory & Keyword given by the user
router.get('/searchByCategoryNKeyword', (req, res) => {
  const searchCategory = req.query.category;
  const searchKeyword = req.query.keyword;
  let query =
    `SELECT * FROM products WHERE productCategory = '` +
    searchCategory +
    `' AND ` +
    `(productDescription LIKE '%` +
    searchKeyword +
    `%' OR productName LIKE '%` +
    searchKeyword +
    `%')`;
  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

module.exports = router;
