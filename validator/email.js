const loginEmail = document.querySelector(".login-email");
const loginButton = document.querySelector("#login-btn");

const validateEmail = function () {
    const re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(String(email.value).toLowerCase());
}



function handleLoginEmail(){
    const valid = validateEmail(loginEmail.value);
    if(!valid){
        invalidEmail.style.display = "block";
    }
    else if(valid){
        invalidEmail.style.display = "none";
    }
}
loginEmail.addEventListener("input",handleLoginEmail);