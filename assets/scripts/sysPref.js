function resetChanges() {
  document.getElementById("sysPrefForm").reset();
}

document.getElementById('SaveChanges').addEventListener('click', UpdateUser);



function UpdateUser(e){
  e.preventDefault();
  let first_name, last_name, street_address, city, state, zipcode,
  password, phone_number;

  first_name = document.getElementById('fName').value;
  last_name = document.getElementById('lName').value;
  street_address = document.getElementById('sAddress').value;
  city = document.getElementById('City').value;
  state = document.getElementById('State').value;
  zipcode = document.getElementById('zipCode').value;
  password = document.getElementById('changePass').value;
  phone_number = document.getElementById('phoneNum').value;

  // 1. Not sure if I should have this many things in the link
  //    and I dont know if I should be looking for everything
  //    when the user does not have to update their sysPref info.
  fetch(`http://localhost:4000/api/user/fetchSysPrefInfo?first_name=${first_name}
  &last_name=${last_name}&street_address=${street_address}
  &city=${city}&state=${state}&zipcode=${zipcode}
  &password=${password}&phone_number=${phone_number}`)

  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);

    // if(data.length == 0){
    //   // if user does not exist
    //   alert('Incorrect credentials');
    // }else if(data.length == 1){
    //   // if user exists
    //   window.location.pathname = '/index.html';
    //   localStorage.setItem('isLoggedIn', 'true');
    // }
  })
  .catch((err) => {
    console.log(err);
  });
}