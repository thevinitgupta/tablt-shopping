const cartIds = JSON.parse(window.localStorage.getItem("cart"));
const container = document.querySelector(".container");
const loader = document.querySelector(".loader");
let ids = [];
(()=>{
    
    cartIds.forEach(obj => {
        ids.push(obj.id)
    });
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
    let cartDisplay = document.createElement("div");
    cartDisplay.className = "cart-display";
    console.log(cartItems)
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
    container.appendChild(cartDisplay);
    console.log(container)
    loader.style.display = "none";
    container.style.display = "inherit";
}