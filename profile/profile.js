let currentUser = {};
const profileOrdersList = document.querySelector(".profile-orders-list");
(()=>{
    currentUser = window.localStorage.getItem("tablt-shopping");
    currentUser = JSON.parse(currentUser);
    if(!currentUser && !currentUser.email){
        console.log(JSON.stringify(currentUser))
        alert("Please Login First");
        window.location = "/login/login.html";
    }
    else {
        console.log(currentUser);
        getProfileData(currentUser.email)
    }
})();

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
    currentUser = userData.user
    setUserData(userData.user); 
}

async function setUserData(user){
    userName.innerText = user.name;
    profileData.innerHTML = `Email : ${user.email}</br>Phone : ${user.phone}`;
    userId = user._id;
}

async function fetchOrders(){
    const ordersBlob = await fetch(`http://localhost:3000/order/${userId}`);
    const ordersList = await ordersBlob.json();
    console.log(ordersList)
    displayOrders(ordersList.orders)

}

function displayOrders(ordersList){
    ordersList.forEach((orderItem,index)=>{
        const orderElement = document.createElement("div");
        let dateString = new Date(Number(orderItem.date));
        const date = dateString.toString();
        orderElement.classList = "order-item";
        orderElement.innerHTML = `<div class="order-item-top" data-id="${orderItem.id}">Order ${index+1}</div>
        <div class="order-item-bottom"><div class="order-item-view-details">View Details</div><div class="order-item-date">${date.substring(4,15)}</div></div>`;
        profileOrdersList.appendChild(orderElement);
    })
}