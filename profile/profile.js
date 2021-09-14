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
        getProfileData(currentUser.email);
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
        orderElement.innerHTML = `<div class="order-item-top" data-id="${orderItem.id}">Order ${index+1} - Delivered to ${orderItem.deliveryLocation.name}</div>
        <div class="order-item-mid"><div class="order-item-total-cost">Total : &#8377;${orderItem.totalCost}</div><div class="order-item-date">${date.substring(4,15)}</div>
            <div class="order-item-total">Total items : ${orderItem.productsList.length}</div>
        </div>`;

        profileOrdersList.appendChild(orderElement);
    })
}

/**
 * customerId: "6127493cd8c3867eb5ac32a8"
date: "1630309930449"
deliveryLocation:
address: "Palash Bagan, Neamatpur, Asansol, West Bengal"
contact: "8389073221"
name: "Vinit Gupta"
pinCode: 713359
[[Prototype]]: Object
paymentType: "COD"
productsList: Array(4)
0: {id: '612c7d7ce75911d671dffd74', quantity: 2, cost: 899, _id: '612c8e2ac9a5d0bb026e46bd'}
1: {id: '612c7dfae75911d671dffd7d', quantity: 1, cost: 1399, _id: '612c8e2ac9a5d0bb026e46be'}
2: {id: '612c7e29e75911d671dffd80', quantity: 3, cost: 420, _id: '612c8e2ac9a5d0bb026e46bf'}
3: {id: '612c80ede75911d6
 */
function displayOrderDetails(orderObj){
    console.log(orderObj)
    const orderDetails = document.createElement("div");
    orderDetails.classList = "order-detail";
    orderDetails.innerHTML = `<div class="order-payment-type">Payment Type : ${orderObj.paymentType}</div>`;


}