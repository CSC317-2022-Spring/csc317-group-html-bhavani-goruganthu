// array of users
// const user_table = JSON.parse(localStorage.getItem('users')) || [];
fetch('http://localhost:4000/api/user/insertUser')

document.getElementById('SignUp').addEventListener('click', localStore);

function resetChanges() {
  document.getElementById('signUpForm').reset();
}

function localStore(e) {
  e.preventDefault();

  // email & passwd
  // let email = document.getElementById('email').value;
  // let psswd1 = document.getElementById('psswd1').value;
  // let psswd2 = document.getElementById('psswd2').value;

  fetch('http://localhost:4000/api/user/insertUser')
  .then((response) => {
    console.log(data);
    return response.json();
  })
  .then((data) => {
    console.log(data);    
    // 1. IDK WHY IT DOES NOT WORK -> Data is not defined??

    // if(data.length == 0){
    //   // if user does not exist
      
    // }else if(data.length == 1){
    //   // if user exists
      
    // }
  })
  .catch((err) => {
    console.log(err);
  });
  // if (psswd1 != psswd2) {
  //   alert('Passwords Do Not Match.');
  // } else {
  //   // check if user has alread signed up.
  //   if (
  //     user_table.some((v) => {
  //       return v.email == email;
  //     })
  //   ) {
  //     alert('duplicate data');
  //   } else {
  //     // pushing data into array of users.
  //     user_table.push({
  //       email: email,
  //       password: psswd1,
  //     });

  //     localStorage.setItem('users', JSON.stringify(user_table));

  //     // send user to login page after signing up
  //     window.location.pathname = '/src/login.html';
  //   }
  // }
}
