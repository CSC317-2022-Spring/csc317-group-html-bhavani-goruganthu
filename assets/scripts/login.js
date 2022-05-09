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
    `http://localhost:4000/api/users/fetchUser?email=${email}&password=${psswd1}`
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
      // User exists
      alert(msg);
      // set localstorage item to true
      localStorage.setItem('isLoggedIn', 'true');
      // redirect user to home page
      window.location.pathname = '/index.html';
    })
    .catch((err) => {
      // throw caught error as an alert
      alert(err);
    });
}
