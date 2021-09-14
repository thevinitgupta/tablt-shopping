(()=>{
    let tablt = window.localStorage.getItem('tablt-shopping');
    let account = JSON.parse(tablt);
    if(account){
        alert("Logout First!")
        window.location = "../profile/profile.html";
    }
})();

const signupName = document.querySelector(".signup-name");
const signupEmail = document.querySelector(".signup-email");
const signupPassword = document.querySelector(".signup-password");
const signupPhone = document.querySelector(".signup-phone");
const signupBtn = document.querySelector("#signup-btn");

signupBtn.addEventListener("click",handleSignup)

async function handleSignup(){
    console.log("Btn CLicked!")
    await fetch(`http://localhost:3000/user/signup/`,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify( {
            name : signupName.value,
            email : signupEmail.value,
            password : signupPassword.value,
            phone : signupPhone.value
        })
    }).then((resp)=>{
        console.log("response -> ",resp)
        if(resp.status===200){
            alert("Signup SuccessFull! Proceeding to Login.")
            window.location = "../login/login.html";
        }
        else {
            alert("Signup Error!");
        }
    })
    .catch((err)=>{
        console.error(err);
    })
}