const localCart = window.localStorage.getItem("cart");
const cartIds = localCart && JSON.parse(localCart);
const container = document.querySelector(".container");
const loader = document.querySelector(".loader");
const cartDisplay = document.querySelector(".cart-display");
const placeOrderBtn = document.querySelector(".place-order-btn");
const cartTotal = document.querySelector(".cart-total");
const checkoutDiv = document.querySelector(".checkout");
const checkoutBtn = document.querySelector("#checkout-btn");
const userName = document.querySelector("#name");
const address = document.querySelector("#address");
const contact = document.querySelector("#contact");
const pincode = document.querySelector("#pincode");
const paymentType = document.querySelector("#paymentType");


let orderData = {
    productsList : [],
    paymentType : "",
    deliveryDetails : {
        name : "",
        address : "",
        contact : 0,
        pinCode : 0
    },
    totalCost : 0
}

let ids = [];
(()=>{
    if(cartIds){
        cartIds.forEach(obj => {
            ids.push(obj.id)
        });
    }
    console.log(ids)
    setTimeout(()=>{
        getCartItems();
    },1000)
    
})();

async function getCartItems(){
    await fetch(`http://localhost:3000/product/list`,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(ids)
    }).then((listBlob)=>{
        console.log(listBlob);
        if(listBlob.status!==200)
        throw "Error fetching cart products!";
        else return listBlob.json();
    })
    .then((cartItems)=>{
        console.log(cartItems);
        displayCartItems(cartItems.products);
    })
    .catch((err)=>{
        console.error(err);
    })
}


function displayCartItems(cartItems){
    console.log(cartItems)
    if(cartItems.length<1){
        let cartEmpty = document.createElement("div");
        cartEmpty.classList = "cart-empty";
        cartEmpty.innerHTML = `Cart Empty!</br>Go to <a href="/index.html" class="cart-home-link">Home</a> and Add Items`;
        cartDisplay.style.display = "none";
        placeOrderBtn.style.display = "none";
        container.appendChild(cartEmpty);
        loader.style.display = "none";
    container.style.display = "inherit";
    }
    else {
        cartItems.forEach((item,index)=>{
            orderData.productsList.push({
                id : item._id,
                cost : item.cost,
                quantity : 1
            })
            orderData.totalCost +=  item.cost;
            console.log(item)
            let cartItem = document.createElement("div");
            cartItem.classList = "cart-item";
            cartItem.innerHTML = `
            <div class="cart-top">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-counter">
                    <div class="count-btn decrease-count">-</div>
                    <div class="cart-item-count">1</div>
                    <div class="count-btn increase-count">+</div>
                </div>
            </div>
            <div class="cart-bottom">
                <div class="cost-per-item">
                    &#8377;${item.cost}
                </div>
            </div>
            `
            cartDisplay.appendChild(cartItem);
        })
        cartTotal.innerHTML = `<span>Total : </span>&#8377;${orderData.totalCost}`
        loader.style.display = "none";
        container.style.display = "inherit";
        placeOrderBtn.addEventListener("click",openCheckout)
    }
}


function openCheckout() {
    checkoutDiv.style.display = "block"
    checkoutBtn.addEventListener("click",checkoutOrder);
}

function checkoutOrder(){
    if(!userName.value || !address.value || !contact.value || !pincode.value){
        alert("Please fill the empty fields!")
    }
    else {
        console.log(paymentType.options[paymentType.options.selectedIndex].value)
        orderData.deliveryDetails = {
            name : userName.value,
            address : address.value,
            contact : contact.value,
            pinCode : pincode.value
        }
        orderData.paymentType = paymentType.options[paymentType.options.selectedIndex].value;
    }
    console.log(orderData)
    console.log("Clicked Checkout!")
}
