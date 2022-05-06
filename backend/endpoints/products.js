const express = require('express');
const database = require('../db'); // connect to the database

const router = express.Router();
router.use(express.json());

//route to get all categories
router.get('/getAllCategories', (req, res) => {
  let query = `SELECT DISTINCT productCategory FROM Products;`;
  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// route to get products based on ID
router.get('/getProductByID', (req, res) => {
  const productID = req.query.productID;
  let query = `SELECT * FROM Products WHERE product_id = ` + productID + `;`;
  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

module.exports = router;
