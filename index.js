const products = document.querySelector(".products");
window.addEventListener("load",fetchProducts);
async function fetchProducts(){
    const productsBlob = await fetch(`http://localhost:3000/product/`);
    const productsList = await productsBlob.json();
    console.log(productsList);
}