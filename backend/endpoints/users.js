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

// route to UPDATE user sysPref information
router.put('/fetchSysPrefInfo', (req, res) => {
  // 1. What do i put for 'req."something".password'

  // const loginEmail = req.body.;
  // const loginPassword = req.query.password;

  // 2. Come up with an UPDATE Query to update the user table
  // with new info

  // let query =
  //   `UPDATE * FROM Users
  //   WHERE email='` + loginEmail + `' AND password='` + loginPassword + `';`;
  //   console.log(query);
  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// route to insert users on signUp
router.post('/insertUser', (req, res) => {
  const userID = uuid();
  console.log(userID);
  const email = req.body.email;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  let query = `INSERT INTO Users(user_id, email, password, first_name, last_name)
              VALUES('` + userID + `','` + email + `','` + password + `','` + first_name + `','` + last_name + `')`;
  database.query(query, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});


module.exports = router;