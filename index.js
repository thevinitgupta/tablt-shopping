const logo = document.querySelector(".logo");
const products = document.querySelector(".products");
window.addEventListener("load",fetchProducts);
logo.addEventListener("click",()=>{
    window.location.href = "/";
})

async function fetchProducts(){
    const productsBlob = await fetch(`http://localhost:3000/product/`);
    const productsList = await productsBlob.json();
    console.log(productsList.products);
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