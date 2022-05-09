const express = require('express');
const router = express.Router();
router.use(express.json());

//Route for adding cookie
router.post('/setUser', (req, res) => {
  res.cookie('loggedInUserData', req.body, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });
  res.status(200).send('User data added to cookie');
});

//Iterate users data from cookie
router.get('/getUser', (req, res) => {
  // return 404 if cookie doesn't exist
  if (JSON.stringify(req.cookies) === '{}') {
    res.status(404).send('User Not Logged In');
  } else {
    // send the email if cookie exists
    res.status(200).send(req.cookies.loggedInUserData);
  }
});

//Route for destroying cookie
router.get('/logout', (req, res) => {
  //it will clear the loggedInUser cookie
  res.clearCookie('loggedInUserData', {
    path: '/',
    domain: 'localhost',
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });
  res.status(200).send('User logged out successfully');
});

module.exports = router;
