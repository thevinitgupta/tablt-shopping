const logo = document.querySelector(".logo");
const products = document.querySelector(".products");
let addItemBtn;
window.addEventListener("load",fetchProducts);
logo.addEventListener("click",()=>{
    window.location.href = "/";
})

let cart = [];


let user = window.localStorage.getItem("tablt-shopping");
console.log(JSON.parse(user))

async function fetchProducts(){
    await fetch(`http://localhost:3000/product/`)
    .then((productsBlob)=>{
        console.log(productsBlob)
        if(!productsBlob.ok){
            console.log("Request not completed!")
        }
        return productsBlob.json();
    })
    .then((productsList)=>{
        displayProducts(productsList.products)
    })
    .catch((err)=>{
        console.log(err)
        if(err="TypeError: Failed to fetch"){
            products.innerHTML = '<h2 class="products-not-found">Failed to Fetch Data! Please refresh or try again later.</h2>';
            document.querySelector(".products-not-found").classList.add("flash");
        }
        else{
            products.innerHTML = '<h2 class="products-not-found">Products not found!</h2>'
        }
    });
    
}

function displayProducts(productsList){
    for (const productData of productsList) {
        console.log(productData);
        const product = document.createElement("div");
        product.classList = "product";
        product.innerHTML= `<div class="product-head"><div class="product-head-name">${productData.name}</div>
        <div class="product-add-item" data-productId="${productData._id}">Add To Cart</div>
        </div>
        <div class="product-info">
            <div class="product-info-cost">&#8377;${productData.cost}</div>
            <div class="product-info-count">Count :${productData.count}</div>
        </div>`;
        console.log(product)
        products.appendChild(product);
        addItemBtn = document.querySelectorAll(".product-add-item");
        addItemBtn.forEach((btn)=>{
            btn.addEventListener("click",addItemToCart);
        })
    }
}

function addItemToCart(e){
    const id = this.getAttribute("data-productId");
    console.log(this.getAttribute("data-productId"));
    cart.push({
        id,
    })
    window.localStorage.setItem("cart",JSON.stringify(cart));
}