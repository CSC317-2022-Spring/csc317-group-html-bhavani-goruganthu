document.getElementById('SaveChanges').addEventListener('click', UpdateUser);
window.addEventListener('load', autoFill);

function resetChanges() {
  document.getElementById("sysPrefForm").reset();
}

let email = "jbar@mail";

function autoFill() {
  document.getElementById("displayEmail").innerHTML = "User: " + email;
}

function UpdateUser(e){
  e.preventDefault();

  let email = 'jbar@mail';


  let first_name = document.getElementById('fName').value;
  let last_name = document.getElementById('lName').value;
  let street_address = document.getElementById('sAddress').value;
  let city = document.getElementById('City').value;
  let state = document.getElementById('State').value;
  let zipcode = document.getElementById('zipCode').value;
  let password = document.getElementById('changePass').value;
  let phone_number = document.getElementById('phoneNum').value;

  data = {
    first_name: first_name,
    last_name: last_name,
    street_address: street_address,
    city: city,
    state: state,
    zipcode: zipcode,
    password: password,
    phone_number: phone_number,
    email: email
  }

  fetch('http://localhost:4000/api/user/updateSysPrefInfo',{
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // if(data.psswd1 == data.psswd2){
      
    // }else{
    //   alert('Passwords Do Not Match.');
    // }
  })
  .catch((err) => {
    console.log(err);
  });
}