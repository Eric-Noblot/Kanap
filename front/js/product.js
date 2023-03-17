// --------------------------------
// RÉCUPÉRATION DE L'ID POUR L'URL
// --------------------------------

const idProduct = window.location.search;
const urlParams = new URLSearchParams(idProduct);
const id = urlParams.get("id");


const product = await(await fetch("http://localhost:3000/api/products/" + id)).json();



// --------------------------------
// FONCTION QUI AFFICHE LE PRODUIT
// --------------------------------

function displayProduct(product) {  

    if (product != null) {
        let item__img = document.querySelector(".item__img");
        item__img.innerHTML += `<img src="${product.imageUrl}" alt="Photo d'un canapé">`;
        let price = document.getElementById("price");
        price.innerHTML = product.price;
        let description = document.getElementById("description");
        description.textContent = product.description;
        
        for (let ColorChoice in product.colors) {
            let option = document.createElement("option");       // Boucle qui liste les différentes couleurs
            option.textContent = product.colors[ColorChoice];
            color.appendChild(option);
        }
    }
    else {
        console.log("Erreur dans la récupération du produit");
    }
}


//-------------------------------------------------------------
// RÉCUPÉRATION DE LA VALUE SAISIE DANS L'INPUT COULEUR
//-------------------------------------------------------------

let color = document.getElementById("colors");
color.addEventListener("change", function(){
    color.style.color = "black"
    return color.value
}) 


//-------------------------------------------------------------
// RÉCUPÉRATION DE LA VALUE SAISIE DANS L'INPUT QUANTITY
//-------------------------------------------------------------
let QuantityValue;
let quantityInput = document.getElementById("quantity");
quantityInput.addEventListener("change", function(){
    // QuantityValue = quantityInput.value
    // return QuantityValue
})

        

// quantityInput.addEventListener("change", function () {
//     if (parseInt(quantityInput.value) <= 0 || parseInt(quantityInput.value) > 100){
//         quantityInput.style.color = "red";
//         return false
//     } 
//     else{
//         quantityInput.style.color = "black";
//         return true
//     }
// })

// ------------------------------------------------------------------------
//FONCTION QUI VÉRIFIE QUE LA QUANTITÉ SAISIE EST UN NOMBRE ENTRE 1 et 100
// ------------------------------------------------------------------------

const isNumber = function (inputNumber) {
    let regex = /^[0-9]+$/;             
    if (regex.test(inputNumber)) {
        if (inputNumber > 0 && inputNumber <= 100){
        return true;
        }
    }
    else {
        return false;
    }
}

// ;-------------------------------------------------------
//FONCTION QUI AJOUTE L'ARTICLE AU LOCAL STORAGE

function addArticle(article){
    localStorage.setItem("article", JSON.stringify(article)); 
}

// ;-------------------------------------------------------
//FONCTION QUI RECUPERE l'ARTICLE DANS LE STORAGE

function getArticle(){
    let article = localStorage.getItem("article");
    if(article == null){
        return []
    }
    else{
    return JSON.parse(article);
    }
}

// ;----------------------------------------------------------
//FONCTION QUI CHECK SI LE PRODUIT EXISTE DEJA DANS LE STORAGE

function addBasket(product){
    let article = getArticle();
    let foundProduct = article.find(function(element){
        return element.id == product.id
    });
    if (foundProduct != undefined){
        foundProduct.quantity ++;
        console.log("il y avait déjà un produit")
    }
    else {
        product.quantity = 1;
        article.push(product);
        console.log("il n'y a pas de quantité trouvée, on push")
    }
    addArticle(article);
}

// ;----------------------------------------------------------
//FONCTION QUI SUPPRIME UN ARTICLE DU LOCAL STORAGE

function removeFromBasket(product){
    let article = getArticle();
    article = article.filter(function(element){
        return element.id != product.id
    })
    addArticle(article)
}
//removeFromBasket({id:"107fb5b75607497b96722bda5b504926"})

// ;----------------------------------------------------------
//FONCTION QUI CALCULE LA QUANTITE

function getNumberProduct(){
    let article = getArticle();
    let number = 0;
    for (let product of article){
        number += product.quantity;
    }
    return number;
}

function getTotalPrice(){
    let article = getArticle();
    let total = 0;
    for (let product of article){
        total += product.quantity * product.price;
    }
    return total
}

let prixTotal = getTotalPrice();
console.log(prixTotal)


// ;----------------------------------------------------------
//EVENT LISTENER SUR LE CLICK DU BOUTON COMMANDER

//document.querySelector('#addToCart').addEventListener('click', addQuantityToCart);
let buttonCart = document.getElementById("addToCart");
buttonCart.addEventListener("click", function () {

    if (isNumber(parseInt(quantityInput.value)) && color.value != "") {
        const productInput = {
            "id": product._id,
            "name": product.name,
            "price": parseInt(product.price),
            "description": product.description,
            "imageUrl": product.imageUrl,
            "altTxt": product.altTxt,
            "color": color.value,
            "quantityInput": parseInt(quantityInput.value)
        }
        addBasket(productInput)
        alert(`Vous avez ajouté ${quantityInput.value} ${product.name} de la couleur ${color.value} dans votre panier`);
        quantityInput.value = 0;    
     }
     else{
        alert("Vous devez chosir une couleur et une quantité !");
     }
})

//     if (isNumber(parseInt(quantityInput.value)) && color.value != "") {

//         const productInput = {
//             "id": id,
//             "name": product.name,
//             "price": parseInt(product.price),
//             "description": product.description,
//             "imageUrl": product.imageUrl,
//             "altTxt": product.altTxt,
//             "color": color.value,
//             "quantityInput": parseInt(quantityInput.value)
//         }

//         alert(`Vous avez ajouté ${quantityInput.value} ${product.name} de la couleur ${color.value} dans votre panier`);
//         quantityInput.value = 0;
//         }
//     else {
//         alert("Vous devez chosir une couleur et une quantité !");
//     }
// })



 displayProduct(product);

