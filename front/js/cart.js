//const products = await(await fetch("http://localhost:3000/api/products")).json();


//  --> Fonctions et variables globales
let article = JSON.parse(localStorage.getItem("article"));

let i = 0
let totalArticlesPrice = 0;
let totalArticlesQuantity = 0;

// -------------------------------------------
//FONCTION QUI AFFICHE LES ÉLÉMENTS DU PANIER

function textDisplay(article){

  article = document.querySelector("#cart__items").innerHTML +=
  `
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img"><img src="${article.imageUrl}" alt="Photographie d'un canapé"></div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${article.name}</h2>
    <p>${article.color}</p>
    <p>${article.price} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
    </div>
    <div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div>
  </div>
</div>
</article>
`

}



// ------------------------------------------------------------
// FONCTION QUI RECUPERE LE PRIX ET AFFICHE LE TOTAL

function totalPriceAndQuantity(priceNumber){
  let totalPrice = document.getElementById("totalPrice");
  let totalQuantity = document.getElementById("totalQuantity");

  totalArticlesPrice += priceNumber.price * priceNumber.quantity
  totalPrice.innerHTML = totalArticlesPrice;

  totalArticlesQuantity += priceNumber.quantity;
  totalQuantity.innerHTML = totalArticlesQuantity;
}



                //------>  FORMULAIRE  <-----------

// ------------------------------------------------------------
// FONCTION QUI VALIDE LES CHAMPS DE SAISIE DU FORMULAIRE

function formValidity(inputForm){
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

//----------------------------------------------------------
// AFFICHAGE DES ARTICLES COMMANDÉS + CALCUL TOTAL 

article.forEach(function() {
  textDisplay(article[i]);
  totalPriceAndQuantity(article[i]);
  i++
})

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


// ------------------------------------------------------------------------
//FONCTION QUI VÉRIFIE QUE LA QUANTITÉ SAISIE EST UN NOMBRE ENTRE 1 et 100
// ------------------------------------------------------------------------

function isValidNumber (number) {
  let regex = /^[0-9]+$/;             
  if (regex.test(number)) {
      if (number > 0 && number <= 100){
      return true;
      }
  }
  else {
      return false;
  }
}

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
//EVENT LISTENER SUR LE CLICK DU BOUTON SUPPRIMER

const deleteArticle = document.querySelectorAll(".cart__item__content__settings__delete");
deleteArticle.forEach(function(element){
    element.style.color = "red"
    element.addEventListener("click", function(){
      
    if (confirm("Êtes-vous sûr de vouloir supprimer?")){
      let article = getCart();
      removeFromCart({id:"107fb5b75607497b96722bda5b504926"})
      location.reload()
    }
  })
})

// })

// ;--------------------------------------    --------------------
//FONCTION QUI SUPPRIME UN ARTICLE DU LOCAL STORAGE

function removeFromCart(product){
  let article = getCart();
  article = article.filter(function(element){
    
    return element.id != product.id
  })
  updateCart(article);
}


//removeFromBasket()


// const r1 = article.closest("div");
// console.log(r1)
// // Renvoie l'élément avec l'identifiant div-02


// //--------------------------------------------------------
// //MISE EN PAGE DU FORMULAIRE ET AJOUT D'UN PADDING 

// let cartOrder = document.querySelectorAll("cart__order__form__question");
// console.log(cartOrder)
// cartOrder.style.color = "red";
// firstName.style.paddingLeft = "10px";
