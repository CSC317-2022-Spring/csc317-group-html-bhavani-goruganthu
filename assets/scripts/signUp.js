// array of users
const user_table = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById("SignUp").addEventListener("click", localStore);


function resetChanges() {
    document.getElementById("signUpForm").reset();
}


function localStore(e){
    e.preventDefault();

    // email & passwd
    let email, psswd1;
    email = document.getElementById("email").value;
    psswd1 = document.getElementById("psswd1").value;
    psswd2 = document.getElementById("psswd2").value;

    if(psswd1 != psswd2){
        alert("Passwords Do Not Match.");
    }else{
        // check if user has alread signed up.
        if(user_table.some((v)=>{return v.email==email})){
            alert("duplicate data");
        }else{
            // pushing data into array of users.
            user_table.push({
                email: email,
                password: psswd1,
            });
        
            localStorage.setItem("users", JSON.stringify(user_table));

            // send user to login page after signing up
            window.location.pathname = '/index.html';
        }
    }
}

