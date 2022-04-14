// localStorage.clear();

const user_table = JSON.parse(localStorage.getItem('users')) || [];


document.getElementById("SignIn").addEventListener("click", LoginValidation);

function LoginValidation(e) {
    e.preventDefault();

    // fetch email & password ".getEleID" by form.
    let email, psswd1, flag;
    email = document.getElementById("email").value;
    psswd1 = document.getElementById("psswd1").value;

    // check if value is empty => have an alert(please login using user name & pass)

    if(email == "" || psswd1 == ""){
        alert("Please Enter an Email & Password.");
    }else{
        // if not empty => check if user table
        for(let i = 0; i < user_table.length; i++){
    
            if(user_table[i].email == email && user_table[i].password == psswd1){
              // send user to home page and change login icon if validated.
              window.location.pathname = "/index.html";

              // TODO: change login icon to logout


            }else{
                // setting flag so that user gets alerted once.
                flag = 1;
            }
        }
        if(flag == 1){
            alert("Incorrect Credentials.");
        }
    }
}
