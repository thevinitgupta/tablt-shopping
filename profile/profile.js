window.addEventListener("load",getProfileData("thevinitgupta@gmail.com"));

let userId = "";
const logo = document.querySelector(".logo");
const userName = document.querySelector(".profile-name");
const profileData = document.querySelector(".profile-data");
const profileDetails = document.querySelector(".profile-details");
const viewOrders = document.querySelector(".view-orders");
viewOrders.addEventListener("click",fetchOrders)
logo.addEventListener("click",()=>{
    window.location.href = "/";
})

async function getProfileData(email){
    const userBlob = await fetch(`http://localhost:3000/user/${email}`);
    console.log(userBlob)
    if(userBlob.status===404){
        profileDetails.innerHTML = `<h2 class="invalid-email">Invalid Email!</h2>`;
    }
    if(userBlob.status!==200){
        profileDetails.innerHTML("<h2>User Data Not Found!</h2>")
    }
    const userData = await userBlob.json();
    console.log(userData);
    setUserData(userData.user); 
}

async function setUserData(user){
    userName.innerText = user.name;
    profileData.innerHTML = `Email : ${user.email}</br>Phone : ${user.phone}`;
    userId = user._id;
}

async function fetchOrders(){
    console.log(userId)
    const ordersBlob = await fetch(`http://localhost:3000/order/${userId}`);
    const ordersList = await ordersBlob.json();
    console.log(ordersList);
}