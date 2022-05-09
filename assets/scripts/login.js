// Check if user exists
document
  .getElementById('login-form')
  .addEventListener('submit', LoginValidation);
function LoginValidation(e) {
  e.preventDefault();
  // fetch email & password ".getEleID" by form.
  let email = document.getElementById('email').value;
  let psswd1 = document.getElementById('psswd1').value;
  fetch(
    `http://localhost:4000/api/users/verifyUserLogin?email=${email}&password=${psswd1}`
  )
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
      // User login successful
      alert(msg);
      // add user data to cookie using auth route
      fetch('http://localhost:4000/userAuth/setUser', {
        // Adding method type
        method: 'POST',
        credentials: 'include', // use this to include cookies in your request
        // Adding headers to the request
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        // Adding body or contents to send
        body: JSON.stringify({
          userEmail: email,
        }),
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
          // redirect user to home page
          window.location.pathname = '/index.html';
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      // throw caught error as an alert
      alert(err);
    });
}
