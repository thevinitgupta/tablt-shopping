const localCart = window.localStorage.getItem("cart");
const cartIds = localCart && JSON.parse(localCart);
const container = document.querySelector(".container");
const loader = document.querySelector(".loader");
const cartDisplay = document.querySelector(".cart-display");
const placeOrderBtn = document.querySelector(".place-order-btn");
const checkoutDiv = document.querySelector(".checkout");
const checkoutBtn = document.querySelector("#checkout-btn");

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
    console.log("Clicked Checkout!")
}
