const express = require('express');
const database = require('../db'); // connect to the database
const { nanoid } = require('nanoid'); // to generate Unique User Id

const router = express.Router();
router.use(express.json());

//route to get orders by user email
router.get('/getOrdersByUserEmail', (req, res) => {
  let query =
    `SELECT * FROM Orders WHERE userEmail = '` + req.query.userEmail + `';`;
  database.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Cannot Fetch Orders Data');
    } else {
      if (result.length === 0) {
        // no orders for the user
        res.status(404).send('No Orders Found');
      } else {
        res.status(200).send(result);
      }
    }
  });
});

// route to insert users on signUp
router.post('/addNewOrder', (req, res) => {
  const orderID = nanoid();
  const userEmail = req.body.userEmail;
  const currentCartProducts = JSON.stringify(req.body.currentCartProducts);
  const currSubTotal = req.body.currSubTotal;
  const checkoutTax = req.body.checkoutTax;
  const checkoutShipping = req.body.checkoutShipping;
  const calculatedTotalCost = req.body.calculatedTotalCost;
  let query =
    `INSERT INTO Orders(order_id, userEmail, products, subTotal, tax, shipping, totalPrice) VALUES('` +
    orderID +
    `','` +
    userEmail +
    `','` +
    currentCartProducts +
    `','` +
    currSubTotal +
    `','` +
    checkoutTax +
    `','` +
    checkoutShipping +
    `','` +
    calculatedTotalCost +
    `')`;
  database.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error Saving User Info');
    } else {
      res.status(200).send('Thank you for Placing the Order!!');
    }
  });
});

module.exports = router;
