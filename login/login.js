import { validateEmail } from "../validator/email";

const email = document.querySelector(".login-email");
const password = document.querySelector(".login-password");
const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click",handleLogin);

email.addEventListener("change",);

function checkEmail(){
    
}


async function handleLogin(e){
    e.preventDefault();
    await fetch(`http://localhost:3000/user/login/`,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : {
            email : email.target.value
        }
    })
}