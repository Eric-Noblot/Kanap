// --------------------------------
// RÉCUPÉRATION DE L'ID POUR L'URL
// --------------------------------

const idProduct = window.location.search;
const urlParams = new URLSearchParams(idProduct);
const id = urlParams.get("id");


const product = await(await fetch("http://localhost:3000/api/products/" + id)).json();

const quantityInput = document.getElementById("quantity");
const colorInput = document.getElementById("colors"); 
const buttonCart = document.getElementById("addToCart");
let isValid;

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
        
        for (let color in product.colors) {
            let option = document.createElement("option");       // Boucle qui liste les différentes couleurs
            option.textContent = product.colors[color];
            colorInput.appendChild(option);
        }
    }
    else {
        console.log("Erreur dans la récupération du produit");
    }
}

// ;----------------------------------------------------------
//FONCTION QUI CHECK QUEL CHAMPS A ÉTÉ MAL RENSEIGNÉ

function checkValidity(color, quantity){
    isValid = true
    if (color == ""){
        const borderColor = document.getElementById("colors");
        borderColor.style.border = "2px solid red";
        alert("Vous devez sélectionner une couleur !");
        isValid = false;
    }
    else {
        const borderColor = document.getElementById("colors");
        borderColor.style.border = "none";
    }
    if (quantity <= 0 || quantity > 100){
        const borderColor = document.getElementById("quantity");
        borderColor.style.border = "2px solid red";
        alert("Vous devez chosir une quantité entre 1 et 100!");
        isValid = false;
    }
    else {
        const borderColor = document.getElementById("quantity");
        borderColor.style.border = "none";
    }
    return isValid
}


                    // ----------> LOCAL STORAGE <---------


// ;-------------------------------------------------------
//FONCTION QUI CRÉE / MET À JOUR LE LOCAL STORAGE

function updateCart(article){
    localStorage.setItem("article", JSON.stringify(article)); 
}

// ;-------------------------------------------------------
//FONCTION QUI RENVOIE LE PANIER 

function getCart(){
    let article = localStorage.getItem("article");
    if(article == null){
        return [];
    }
    else{
    return JSON.parse(article);  
    }
}

// ;----------------------------------------------------------
//CHECK SI LE PRODUIT EXISTE DEJA DANS LE STORAGE

function checkProductStorage(product){
    let article = getCart();
    let foundProduct = article.find(function(element){
        return element.id == product.id && element.color == product.color;
    });

    if (foundProduct){    
        foundProduct.quantity = parseInt(quantity.value) + foundProduct.quantity;
    }
    else {                      
        article.push(product);
    }
    updateCart(article);
}


// ;----------------------------------------------------------
//EVENT LISTENER SUR LE CLICK DU BOUTON COMMANDER

//document.querySelector('#addToCart').addEventListener('click', addQuantityToCart);

buttonCart.addEventListener("click", function () {

    if (checkValidity(colorInput.value, quantityInput.value)) {

        const productInput = {
            "id": product._id,
            "name": product.name,
            "price": parseInt(product.price),
            "description": product.description,
            "imageUrl": product.imageUrl,
            "altTxt": product.altTxt,
            "color": colorInput.value,
            "quantity": parseInt(quantityInput.value)
        }

        checkProductStorage(productInput);
        alert(`Vous avez ajouté ${quantityInput.value} ${product.name} de la couleur ${colorInput.value} dans votre panier`);

        quantityInput.value = 0;    
        colorInput.value = "";
     }

})



displayProduct(product); //j'aimerais mettre ca au début dans un test avec fecth qui renvoie cette fonction si la réponse est ok 
                        // puis je mettre un amway ou async avant pour mettre cettet fonction dès le début et attendre avant d'afficher?       