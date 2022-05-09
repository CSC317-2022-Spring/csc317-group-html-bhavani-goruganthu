// function resetChanges() {
//   document.getElementById('sysPrefForm').reset();
// }
let first_name = document.getElementById('fName');
let last_name = document.getElementById('lName');
let user_email = document.getElementById('email');
let street_address = document.getElementById('sAddress');
let city = document.getElementById('City');
let state = document.getElementById('State');
let zipcode = document.getElementById('zipCode');
let password = document.getElementById('changePass');
let phone_number = document.getElementById('phoneNum');

window.addEventListener('load', fetchUserDetails);
function fetchUserDetails() {
  fetch('http://localhost:4000/userAuth/getUser', {
    // Adding method type
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        // get the text from the response object
        const text = response.text();
        throw new Error(text);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      fetch(
        `http://localhost:4000/api/users/fetchUserDetails?email=${data.userEmail}`
      )
        .then(async (response) => {
          if (!response.ok) {
            // get the text from the response object
            const text = await response.text();
            throw new Error(text);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          autoFillUserData(data[0]);
        })
        .catch((err) => {
          alert(err);
          // redirect user if email is incorrect for some reason
          window.location.pathname = '/index.html';
        });
    })
    .catch((err) => {
      console.log(err);
      // redirect user if not logged in
      window.location.pathname = '/index.html';
    });
}
function autoFillUserData(data) {
  first_name.value = data.first_name;
  last_name.value = data.last_name;
  email.value = data.email;
  street_address.value = data.street_address;
  city.value = data.city;
  state.value = data.state;
  zipcode.value = data.zipcode;
  phone_number.value = data.phone_number;
}

// onSubmit event for the form
document.getElementById('sysPrefForm').addEventListener('submit', updateUser);
function updateUser(e) {
  e.preventDefault();
  let updatedData = {
    first_name: first_name.value,
    last_name: last_name.value,
    street_address: street_address.value,
    city: city.value,
    state: state.value === 'null' ? '' : state.value,
    zipcode: zipcode.value,
    password: password.value,
    phone_number: phoneNum.value,
    email: user_email.value,
  };
  fetch('http://localhost:4000/api/users/updateSysPrefInfo', {
    method: 'PUT',
    body: JSON.stringify(updatedData),
    headers: {
      'Content-type': 'application/json',
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
      window.location.reload();
    })
    .catch((err) => {
      // throw the error as an alert
      alert(err);
    });
}
