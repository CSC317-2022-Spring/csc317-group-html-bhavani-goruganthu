const express = require('express');
const { nanoid } = require('nanoid'); // to generate Unique User Id
const database = require('../db'); // connect to the database
const bcrypt = require('bcryptjs');

const router = express.Router();
router.use(express.json());

// route to insert users on signUp
router.post('/insertUser', (req, res) => {
  const userID = nanoid();
  const email = req.body.email;
  const pwd = req.body.pwd;
  const fname = req.body.fname;
  const lname = req.body.lname;
  // Encyprt password
  let signUpHash = bcrypt.hashSync(pwd, 10);
  let query =
    `INSERT INTO Users(user_id, email, password, first_name, last_name)
              VALUES('` +
    userID +
    `','` +
    email +
    `','` +
    signUpHash +
    `','` +
    fname +
    `','` +
    lname +
    `')`;
  database.query(query, (err, result) => {
    if (err) {
      if (err.sqlMessage.includes('Duplicate entry')) {
        res.status(409).send('User already Exists');
      } else {
        res.status(500).send('Error Saving User Info');
      }
    } else {
      res.status(200).send('SignUp Successful!!');
    }
  });
});

// route to get user login information --> get email & password
router.get('/fetchUser', (req, res) => {
  const loginEmail = req.query.email;
  const loginPassword = req.query.password;
  let query = `SELECT * FROM Users WHERE email='` + loginEmail + `';`;
  database.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Cannot Fetch User Data');
    } else {
      if (result.length === 0) {
        // user doesn't exist
        res.status(404).send('Incorrect Credentials!');
      } else {
        bcrypt.compare(loginPassword, result[0].password, (err, isMatch) => {
          if (err) {
            // error in comparing pwds using bcrypt
            res.status(500).send('Cannot Fetch User Data');
          } else if (!isMatch) {
            //Password doesn't match!
            res.status(404).send('Incorrect Credentials!');
          } else {
            // 'Password matches!'
            res.status(200).send('Login Successful!!');
          }
        });
      }
    }
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

module.exports = router;
