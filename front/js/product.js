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
function displayProduct(product){

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
// color.addEventListener("change", function(){
//     color.style.color = "black"
//     return color.value
// }) 


//-------------------------------------------------------------
// RÉCUPÉRATION DE LA VALUE SAISIE DANS L'INPUT QUANTITY
//-------------------------------------------------------------

let quantityInput = document.getElementById("quantity");
quantityInput.addEventListener("change", function(){
    // QuantityValue = quantityInput.value
    // return QuantityValue
})


// ------------------------------------------------------------------------
//FONCTION QUI VÉRIFIE QUE LA QUANTITÉ SAISIE EST UN NOMBRE ENTRE 1 et 100
// ------------------------------------------------------------------------

function isNumber (inputNumber) {
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

// ;----------------------------------------------------------
//FONCTION QUI CHECK QUEL CHAMPS A ÉTÉ MAL RENSEIGNÉ

function checkValidity(inputColor, inputQuantity){
    if (inputColor == ""){
        const borderColor = document.getElementById("colors");
        borderColor.style.border = "2px solid red";
        alert("Vous devez sélectionner une couleur !");
    }
    else {
        const borderColor = document.getElementById("colors");
        borderColor.style.border = "none";
    }
    if (inputQuantity <= 0 || inputQuantity > 100){
        const borderColor = document.getElementById("quantity");
        borderColor.style.border = "2px solid red";
        alert("Vous devez chosir une quantité entre 1 et 100!");
    }
    else {
        const borderColor = document.getElementById("quantity");
        borderColor.style.border = "none";
    }
}


                    // ----------> LOCAL STORAGE <---------


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
        return [];
    }
    else{
    return JSON.parse(article);
    }
}

// ;----------------------------------------------------------
//FONCTION QUI CHECK SI LE PRODUIT EXISTE DEJA DANS LE STORAGE

function addProduct(product){
    let article = getArticle();
    let foundIdProduct = article.find(function(element){
        return element.id == product.id;
    });

    let foundColorProduct = article.find(function(element){
        return element.color == product.color;
    });

    if (foundIdProduct != undefined && foundColorProduct != undefined){     // si le produit ET la couleur exite déjà dans le panier
        console.log("foundColorProduct" + foundColorProduct)  ;       
        let productQuantity;
        productQuantity = parseInt(quantity.value) + product.quantity;
        console.log("il y avait déjà un produit");
        console.log("quantité tapée: " + quantity.value);
        console.log("quantité dans le Local: " + product.quantity);
        console.log("quantité après addition:" + productQuantity);

    }
    else {                      
        article.push(product);
        console.log("foundColorProduct" + foundColorProduct)   ;  
        console.log("il n'y a pas de quantité trouvée, on push");
        console.log("quantité tapée: " + quantity.value);
        console.log("quantité dans le Local: " + product.quantity);
    }
    addArticle(article);
}

// ;----------------------------------------------------------
//FONCTION QUI SUPPRIME UN ARTICLE DU LOCAL STORAGE

function removeFromBasket(product){
    let article = getArticle();
    article = article.filter(function(element){
        return element.id != product.id;
    })
    addArticle(article);
}
//removeFromBasket({id:"107fb5b75607497b96722bda5b504926"})




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
            "quantity": parseInt(quantityInput.value)
        }

        addProduct(productInput);
        alert(`Vous avez ajouté ${quantityInput.value} ${product.name} de la couleur ${color.value} dans votre panier`);

        checkValidity(color.value, quantityInput.value);
        quantityInput.value = 0;    
        color.value = "";
     }
     else{
        checkValidity(color.value, quantityInput.value);
     }
})



displayProduct(product);