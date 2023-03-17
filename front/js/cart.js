//const products = await(await fetch("http://localhost:3000/api/products")).json();


//  --> Fonctions et variables globales
let articleInput = JSON.parse(localStorage.getItem("article"));

// -------------------------------------------
//FONCTION QUI AFFICHE LES ÉLÉMENTS DU PANIER
// -------------------------------------------

const textDisplay = function(articleInput){

  let article = document.querySelector("#cart__items").innerHTML +=
  `
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img"><img src="${articleInput.imageUrl}" alt="Photographie d'un canapé"></div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${articleInput.name}</h2>
    <p>${articleInput.color}</p>
    <p>${articleInput.price} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${articleInput.quantity}">
    </div>
    <div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div>
  </div>
</div>
</article>
`
console.log(articleInput.name)
}




//------------------------------------------------------
// CALCUL DU PRIX TOTAL DES ARTICLES SÉLÉCTIONNÉS
let i = 0
articleInput.forEach(function(product) {
 // for (let i = 0; i< localStorage.length; i++){

  textDisplay(articleInput[i]); 
  i++
})

// totalPrice = document.getElementById("totalPrice");
// totalPrice.innerHTML = articlePrice;
// totalQuantity = document.getElementById("totalQuantity");
// totalQuantity.innerHTML = articleInput.quantity;


//--------------FORMULAIRE-------------------

// ------------------------------------------------------------
// FONCTION QUI VALIDE LES CHAMPS DE SAISIE DU FORMULAIRE

const formValidity = function(inputForm){
  let regex = /^[a-zA-Z-_'éÉèÈêÊëËâÂäÄàÀôÔöÖ ]+$/; 
  let error = document.querySelector(`#${inputForm.id}ErrorMsg`); 
  if (inputForm.value == "") {
    error.textContent = "Le champs doit être rempli";
    error.style.display = "inline";
    error.style.color = "red";
  } else if (regex.test(inputForm.value) === false) {
    error.textContent = "Vous ne pouvez pas saisir de numéros ou de caractères invalides";
    error.style.display = "inline";
    error.style.color = "red";
  }
  else{
    error.style.display = "none";
  }
}

//------------------------------------------------------
//VÉRIFICATION LORS DE LA SAISIE DU PRÉNOM, NOM ET VILLE

let firstName = document.getElementById("firstName");
firstName.addEventListener("keyup", function () {
  formValidity(firstName)
})

let lastname = document.getElementById("lastName");
lastname.addEventListener("keyup", function () {
  formValidity(lastname)
})
let city = document.getElementById("city");
city.addEventListener("keyup", function () {
  formValidity(city)
})

let address = document.getElementById("address");
let email = document.getElementById("email");



//----------------------------------------------------------
// MISE EN PAGE DU FORMULAIRE ET AJOUT D'UN PADDING 

// let cartOrder = document.querySelectorAll("div.cart__order__form__question");
// console.log(cartOrder)
// cartOrder[2].style.color = "red";
// firstName.style.paddingLeft = "10px";

//  --> GESTION DU LOCALSTORAGE
//let color = JSON.parse(localStorage.getItem("color"));


