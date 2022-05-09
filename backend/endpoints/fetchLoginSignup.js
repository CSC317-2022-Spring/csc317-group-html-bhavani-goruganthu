const { uuid } = require('uuidv4');
const express = require('express');
const database = require('../db'); // connect to the database

const router = express.Router();
router.use(express.json());

// route to get user login information --> get email & password
router.get('/fetchUser', (req, res) => {
    const loginEmail = req.query.email;
    const loginPassword = req.query.password;

    let query =
      `SELECT * FROM Users
      WHERE email='` + loginEmail + `' AND password='` + loginPassword + `';`;
      console.log(query);
    database.query(query, (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  });


// route to know which user is using sysPref & fill in email for them
router.get('/fetchSysPrefInfo', (req, res) => {
  const loginEmail = req.query.email;

  let query = 
  `SELECT * FROM Users
  WHERE email='` + loginEmail + `';`;

  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});


// route to UPDATE user sysPref information
router.put('/updateSysPrefInfo', (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const street_address = req.body.street_address;
  const city = req.body.city;
  const state = req.body.state;
  const zipcode = req.body.zipcode;
  const password = req.body.password;
  const phone_number = req.body.phone_number;
  const email = req.body.email;

  // UPDATE Query that updates the user table with new info
  let query =
    `UPDATE Users
    Set first_name='` + first_name + `', last_name='` + last_name
      + `', street_address='` + street_address + `', city='` + city
      + `', state='` + state + `', zipcode='` + zipcode + `', password='`
      + password + `', phone_number='` + phone_number + `'
    WHERE email='` + email + `';`;
    console.log(query);
  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// route to insert users on signUp
router.post('/insertUser', (req, res) => {
  const userID = uuid();
  const email = req.body.email;
  const password = req.body.psswd1;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  let query = `INSERT INTO Users(user_id, email, password, first_name, last_name)
              VALUES('` + userID + `','` + email + `','` + password + `','` + first_name
              + `','` + last_name + `');`;
  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});


module.exports = router;