document.getElementById('SignUp').addEventListener('click', localStore);

function resetChanges() {
  document.getElementById('signUpForm').reset();
}

function localStore(e) {
  e.preventDefault();

  let email = document.getElementById('email').value;
  let password = document.getElementById('psswd1').value;
  let passwordRep = document.getElementById('psswd2').value;
  let first_name = document.getElementById('fName').value;
  let last_name = document.getElementById('lName').value;

  data = {
    email: email,
    psswd1: password,
    psswd2: passwordRep,
    fName: first_name,
    lName: last_name
  }

  fetch('http://localhost:4000/api/user/insertUser',{
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
      
    },
  })
  .then(response => response.json())
  .then(data => {
    if(data.psswd1 == data.psswd2){
      // Find a way to look for duplicate data in DB
      // if(!duplicate data){
        // window.location.pathname = '/src/login.html';

      // }else{
      //   alert('User already exists.');
      // }
    }else{
      alert('Passwords Do Not Match.');
    }
  })
  .catch((err) => {
    console.log(err);
  });
}
