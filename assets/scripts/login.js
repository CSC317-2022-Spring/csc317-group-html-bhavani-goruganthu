const user_table = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('SignIn').addEventListener('click', LoginValidation);
function LoginValidation(e) {
  e.preventDefault();
  // fetch email & password ".getEleID" by form.
  let email, psswd1;
  email = document.getElementById('email').value;
  psswd1 = document.getElementById('psswd1').value;

  // check if value is empty => have an alert(please login using user name & pass)
  if (email == '' || psswd1 == '') {
    alert('Please Enter an Email & Password.');
  } else {
    let filteredUser = user_table.filter(
      (user) => user.email == email && user.password == psswd1
    );
    if (filteredUser.length === 0) {
      alert('Incorrect credentials');
    } else {
      // send user to home page and change login icon if validated.
      window.location.pathname = '/index.html';
      localStorage.setItem('isLoggedIn', 'true');
    }
  }
}
