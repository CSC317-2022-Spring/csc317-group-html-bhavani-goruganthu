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
router.get('/verifyUserLogin', (req, res) => {
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

// route to fetch all user Details
router.get('/fetchUserDetails', (req, res) => {
  const loginEmail = req.query.email;
  let query = `SELECT * FROM Users WHERE email='` + loginEmail + `';`;
  database.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Cannot Fetch User Data');
    } else {
      if (result.length === 0) {
        // user doesn't exist
        res.status(404).send('Incorrect Credentials!');
      } else {
        res.status(200).send(result);
      }
    }
  });
});

// route to UPDATE user sysPref information
router.put('/updateSysPrefInfo', (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  let tempQuery1 =
    `UPDATE Users Set first_name='` +
    first_name +
    `', last_name='` +
    last_name +
    `', `;
  let tempQuery2 =
    req.body.street_address !== ''
      ? `street_address='` + req.body.street_address + `', `
      : `street_address=null, `;
  let tempQuery3 =
    req.body.city !== '' ? `city='` + req.body.city + `', ` : `city=null, `;
  let tempQuery4 =
    req.body.state !== '' ? `state='` + req.body.state + `', ` : `state=null, `;
  let tempQuery5 =
    req.body.zipcode !== ''
      ? `zipcode='` + req.body.zipcode + `', `
      : `zipcode=null, `;
  // Encrypt Pwd - if changed
  let tempQuery6 =
    req.body.password !== ''
      ? `password='` + bcrypt.hashSync(req.body.password, 10) + `', ` // change with new pwd
      : ``; // password cannot be null
  let tempQuery7 =
    req.body.phone_number !== ''
      ? `phone_number='` + req.body.phone_number + `' `
      : `phone_number=null `;
  let tempQuery8 = `WHERE email='` + email + `';`;

  // Form the Update Query
  // UPDATE Query that updates the user table with new info
  let query =
    tempQuery1 +
    tempQuery2 +
    tempQuery3 +
    tempQuery4 +
    tempQuery5 +
    tempQuery6 +
    tempQuery7 +
    tempQuery8;
  database.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error Saving User Info');
    } else {
      res.status(200).send('User Details Saved Successfully!!');
    }
  });
});

module.exports = router;
