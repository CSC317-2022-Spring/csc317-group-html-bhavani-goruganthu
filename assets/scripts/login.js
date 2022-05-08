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
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.length == 0) {
        // if user does not exist
        alert('Incorrect credentials');
      } else if (data.length === 1) {
        // if user exists
        window.location.pathname = '/index.html';
        localStorage.setItem('isLoggedIn', 'true');
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
