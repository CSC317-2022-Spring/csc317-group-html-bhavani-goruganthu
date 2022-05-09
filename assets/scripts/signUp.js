// reset the form
function resetChanges() {
  document.getElementById('signUpForm').reset();
}

// listen for form submit event
document.getElementById('signUpForm').addEventListener('submit', insertUser);

// work on insertUser API
function insertUser(e) {
  e.preventDefault();
  // email & passwd
  let email = document.getElementById('email').value;
  let psswd1 = document.getElementById('psswd1').value;
  let psswd2 = document.getElementById('psswd2').value;
  let fname = document.getElementById('fName').value;
  let lname = document.getElementById('lName').value;
  if (psswd1 !== psswd2) {
    alert('Passwords Do Not Match!');
  } else {
    fetch('http://localhost:4000/api/users/insertUser', {
      // Adding method type
      method: 'POST',
      // Adding body or contents to send
      body: JSON.stringify({
        email: email,
        pwd: psswd1,
        fname: fname,
        lname: lname,
      }),
      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          // get the text from the response object
          const text = await response.text();
          throw new Error(text);
        } else {
          return response.text();
        }
      })
      .then((msg) => {
        // success alert
        alert(msg);
        // send user to login page after signing up
        window.location.pathname = '/src/login.html';
      })
      .catch((err) => {
        // throw the error as an alert
        alert(err);
        // reset the form
        resetChanges();
      });
  }
}
