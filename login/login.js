const email = document.querySelector(".login-email");
const password = document.querySelector(".login-password");
const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click",handleLogin)


async function handleLogin(e){
    e.preventDefault();
    console.log(email.value);
    // await fetch(`http://localhost:3000/user/login/`,{
    //     method : 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body : {
    //         email : email.target.value
    //     }
    // })
}