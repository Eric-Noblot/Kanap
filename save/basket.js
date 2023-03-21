function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket)); 
}

function getBasket(){
    let basket = localStorage.getItem("basket");
    if(basket == null){
        return []
    }
    return JSON.parse(basket);
}

function addBasket(product){
    let basket = getBasket();
    //let foundProduct = basket.find(p => p.id == product.id );
    let foundProduct = basket.find(function(p){
        return p.id == product.id
    });
    if (foundProduct != undefined){
        foundProduct.quantity++; 
        console.log("il y avait déjà un produit")
    }
    else {
        product.quantity = 1;
        basket.push(product);
        console.log("il n'y a pas de quantité trouvée, on push")
    }
    saveBasket(basket);
}

 addBasket({id: "1", "name": "eric", "price": 20}) 
addBasket({id: "2", "name": "eric", "price": 20}) 
addBasket({id: "3  ", "name": "eric", "price": 20}) 