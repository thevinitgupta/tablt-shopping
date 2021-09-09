const logo = document.querySelector(".logo");
const products = document.querySelector(".products");
window.addEventListener("load",fetchProducts);
logo.addEventListener("click",()=>{
    window.location.href = "/";
})

async function fetchProducts(){
    const productsBlob = await fetch(`http://localhost:3000/product/`)
    .then((pBlob)=>{
        console.log(pBlob)
        if(!pBlob.ok){
            console.log("Request not completed!")
        }
        return pBlob;
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
    if(productsBlob){
        const productsList = await productsBlob.json();
        console.log(productsList.products);
    }
    displayProducts(productsList.products)
}

function displayProducts(productsList){
    for (const productData of productsList) {
        console.log(productData);
        const product = document.createElement("div");
        product.classList = "product";
        product.innerHTML= `<span class="product-name">${productData.name}</span>
        <div class="product-info">
            <div class="product-info-cost">&#8377;${productData.cost}</div>
            <div class="product-info-count">Count :${productData.count}</div>
        </div>`;
        console.log(product)
        products.appendChild(product);
    }
    
}