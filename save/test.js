const products = await(await fetch("http://localhost:3000/api/products")).json();

let prenom = document.getElementById("prenom");
let age = document.getElementById("age");


// window.localStorage.setItem("prenom", prenom.value);
// window.localStorage.setItem("age", age.value);
window.localStorage.setItem("prenom", JSON.stringify("Christian"));
window.localStorage.setItem("age", JSON.stringify("62"));
const prenomLocal = JSON.parse(window.localStorage.getItem("prenom"));
const ageLocal = JSON.parse(window.localStorage.getItem("age"));

let h1 = document.querySelector("h1");
h1.innerHTML = `Bonjour ${prenomLocal} ! <br>Vous avez ${ageLocal} ans !`

//window.localStorage.removeItem("nom")
window.localStorage.removeItem("prenom");
window.localStorage.removeItem("age");
let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function(){
    window.localStorage.removeItem("prenom");
    window.localStorage.removeItem("age");
})

console.log(prenom);
console.log(age);


//---------------------------------------------------

localStorage.removeItem("prenom")
localStorage.removeItem("age")

function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket)); // on modifie l'objet complexe en chaine de caractères
}

function getBasket(){
    let basket= localStorage.getItem("basket");
    if (basket == null){
        return [];
    } 
    else {
        return JSON.parse(basket);// on repasse la chaîne de caractères en objet complexe
    }
}
function addBasket(product){
    let basket = getBasket();
    let foundProduct = basket.find(p=> p.id == product.id);
    if (foundProduct != undefined){
        foundProduct.quantity++;
    }
    else {
        product.quantity = 1;
        basket.push(product);
    }
    saveBasket(basket);
}

function removeFromBasket(product){
    let basket = getBakset();
    basket = basket.filter(p => p.id == product.id);
    saveBasket(basket);
}

function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if (foundProduct != undefined){
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0){
            removeFromBasket(foundProduct); 
       }
    else {
        saveBasket(basket);
        }
    }
}

function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for (let product of basket){
        number += product.quantity;
    }
    return number;
}

function getTotalPrice(){
    let basket = getBasket();
    let total = 0;
    for (let product of basket){
        total += product.quantity * product.price;
    }
    return total
}

