const email = document.querySelector(".login-email");
const password = document.querySelector(".login-password");
const loginBtn = document.querySelector("#login-btn");
const invalidEmail = document.querySelector("#invalid-email");

loginBtn.addEventListener("click",handleLogin);

(()=>{
    let tablt = window.localStorage.getItem('tablt-shopping');
    let account = JSON.parse(tablt);
    if(account){
        alert("Already Logged In!")
        window.location = "/";
    }
})();

async function handleLogin(e){
    e.preventDefault();
    console.log("button clicked!")
    await fetch(`http://localhost:3000/user/login/`,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify( {
            email : email.value,
            password : password.value
        })
    }).then((resp)=>{
        console.log("response -> ",resp)
        return resp.json();
    })
    .then((userData)=>{
        console.log(userData)
        const user = {
            'token' : userData.accessToken,
            'email' : userData.email
        };
        window.localStorage.setItem('tablt-shopping',JSON.stringify(user));
        email.value="";
        password.value="";
        window.location = "/";
    })
    .catch((err)=>{
        console.error("resp error -> ",err)
    })
}