const cartIds = JSON.parse(window.localStorage.getItem("cart"));
let ids = [];
(()=>{
    
    cartIds.forEach(obj => {
        ids.push(obj.id)
    });
    console.log(ids)
    getCartItems();
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
    })
    .catch((err)=>{
        console.error(err);
    })
}