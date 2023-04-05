//const products = await(await fetch("http://localhost:3000/api/products")).json();


//  --> Fonctions et variables globales

let articles = getCart();
const totalPrice = document.getElementById("totalPrice");
const totalQuantity = document.getElementById("totalQuantity");
const cartItems = document.querySelector("#cart__items")
const cartPrice = document.querySelector(".cart__price")

let totalArticlesPrice = 0;
let totalArticlesQuantity = 0;


// ------------------------------------------------------------
// RECUPÈRE LE PRIX ET AFFICHE LE TOTAL

function totalPriceAndQuantity(article) {

  totalArticlesPrice += article.price * article.quantity
  totalPrice.innerHTML = totalArticlesPrice;

  totalArticlesQuantity += article.quantity;
  totalQuantity.innerHTML = totalArticlesQuantity;
}

// ---------------------------->  FORMULAIRE  <-------------------------


// // ------------------------------------------------------------
// AJOUT D'UN PADDING SUR LE FORMULAIRE

firstName = document.querySelector("#firstName").style.paddingLeft = "10px";
lastName = document.querySelector("#lastName").style.paddingLeft = "10px";
address = document.querySelector("#address").style.paddingLeft = "10px";
city = document.querySelector("#city").style.paddingLeft = "10px";
email = document.querySelector("#email").style.paddingLeft = "10px";


// ------------------------------------------------------------
//  VALIDE LES CHAMPS DE SAISIE DU FORMULAIRE

function stringValidity(inputForm) {
  const regex = /^[a-zA-Z-_'àèìòùÀÈÌÒÙáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ ]+$/;
  if (inputForm == "") {
    return false

  } else if (regex.test(inputForm) === false) {
    return false
  }
  else {
    return true
  }
}

// ------------------------------------------------------------
//  VALIDE LES CHAMPS DE SAISIE DE L'ADRESSE POSTALE

function addressValidity(address) {
  const regex = /^[a-zA-Z0-9\s,.'-]{3,}$/; // accepte 3 caractères minimum
  if (address == "") {
    return false

  } else if (regex.test(address) === false) {
    return false
  }
  else {
    return true
  }
}

// // ------------------------------------------------------------
// // VALIDE LA SAISIE DE L'ADRESSE EMAIL

function emailValidity(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email == "") {
    return false

  } else if (regex.test(email) === false) {
    return false
  }
  else {
    return true
  }
}

//       -----------------> Affichage de la page   <----------------------

//----------------------------------------------------------
// REGROUPE LES ARTICLES PAR NOM ET PAR COULEUR DANS LE PANIER

function articleSort() {
  articles.sort(function (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1
    }
    return 0
  })
}

// -------------------------------------------
// AFFICHE LES ÉLÉMENTS DU PANIER

function textDisplay(article) {
  let articlePrice = 0;
  articlePrice = article.price * article.quantity

  cartItems.innerHTML +=
    `
<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
<div class="cart__item__img"><img src="${article.imageUrl}" alt="Photographie d'un canapé"></div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${article.name}</h2>
    <p>${article.color}</p>
    <p>${articlePrice} €</p>
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

//----------------------------------------------------------
// AFFICHAGE DES ARTICLES COMMANDÉS + CALCUL TOTAL 

function refreshCart() {
  cartItems.innerHTML = ""
  totalArticlesPrice = 0;
  totalArticlesQuantity = 0;

  if (articles != "") {
    articles = getCart();
    articleSort(articles);        
    updateCart(articles);

    articles.forEach(function (article) {
    textDisplay(article);
    totalPriceAndQuantity(article); 
    })
  }

  // ;----------------------------------------------------------
  //EVENT LISTENER SUR LE CHANGEMENT DE QUANTITÉ

  let changeQuantity = document.querySelectorAll(".itemQuantity")
  for (let i = 0; i < changeQuantity.length; i++) {

    changeQuantity[i].addEventListener("change", function () {

      articles[i].quantity = Number(changeQuantity[i].value)

      if (articles[i].quantity < 0 || articles[i].quantity > 100) {
        alert("Vous devez saisir une quantité entre 1 et 100")
        articles[i].quantity = 0;
      }
      updateCart(articles)
      refreshCart()
    })

  }
  // ;----------------------------------------------------------
  //EVENT LISTENER SUR LE CLICK DU BOUTON SUPPRIMER
  const removeArticle = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < removeArticle.length; i++) {
    removeArticle[i].addEventListener("click", function () {

      if (confirm("Êtes-vous sûr de vouloir supprimer?")) {
        localStorage.setItem('itemList', JSON.stringify(i)); // On crée une clé dans le Local pour sauvegarder l'index à supprimer
        removeFromCart(articles)
      }
      refreshCart()
    })
  }
}

refreshCart()

//       -----------------> Gestion du LocalStorage <-------------------


// ;-------------------------------------------------------
// MET À JOUR LE LOCAL STORAGE

function updateCart(articles) {
  localStorage.setItem("article", JSON.stringify(articles));
}

// ;-------------------------------------------------------
//FONCTION QUI RECUPÉRE LA CLÉ "ARTICLE" DU LOCAL

function getCart() {
  let articles = localStorage.getItem("article");

  if (articles == null || articles == "") {
    return "[]";
  }
  else {

    return JSON.parse(articles);
  }
}

// ;----------------------------------------------------------
// SUPPRIME UN ARTICLE DU LOCAL STORAGE

function removeFromCart(articles) {

  let indexArticleToRemove = localStorage.getItem("itemList");

  articles.splice(indexArticleToRemove, 1)
  updateCart(articles);

  localStorage.removeItem("itemList")

  if (articles == "") {
    localStorage.removeItem("article")
    cartPrice.style.display = "none"
  }
}


// // ------------------------------------------------------------
// EVENT LISTENER CLICK BOUTON COMMANDER 

let orderBtn = document.querySelector('#order');
orderBtn.addEventListener('click', function (element) {
  element.preventDefault();

  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,

  };

  // // ------------------------------------------------------------
  // GESTION DU CHAMPS PRÉNOM DANS LE FORMULAIRE

  function firstNameCheck() {

    let inputFirstName = document.querySelector("#firstName");
    if (stringValidity(inputFirstName.value)) {
      inputFirstName.style.border = "solid 2px green";
      document.querySelector("#firstNameErrorMsg").textContent = "";
      return true;
    }
    else {
      inputFirstName.style.border = "solid 2px red";
      document.querySelector("#firstNameErrorMsg").textContent = "Le prénom est mal renseigné";
      return false;
    }

  }

  // // ------------------------------------------------------------
  // GESTION DU CHAMPS NOM DANS LE FORMULAIRE

  function lastNameCheck() {

    let inputLastName = document.querySelector("#lastName");
    if (stringValidity(inputLastName.value)) {
      inputLastName.style.border = "solid 2px green";
      document.querySelector("#lastNameErrorMsg").textContent = "";
      return true;
    }

    else {
      inputLastName.style.border = "solid 2px red";
      document.querySelector("#lastNameErrorMsg").textContent = "Le nom est mal renseigné";
      return false;
    }

  }

  // // ------------------------------------------------------------
  // GESTION DU CHAMPS ADRESSE POSTALE DANS LE FORMULAIRE

  function addressCheck() {

    let inputAddress = document.querySelector("#address");
    if (addressValidity(inputAddress.value)) {
      inputAddress.style.border = "solid 2px green";
      document.querySelector("#addressErrorMsg").textContent = "";
      return true;
    }

    else {
      inputAddress.style.border = "solid 2px red";
      document.querySelector("#addressErrorMsg").textContent = "L'adresse n'est pas valide";
      return false;
    }

  }

  // // ------------------------------------------------------------
  // GESTION DU CHAMPS VILLE DANS LE FORMULAIRE

  function cityCheck() {

    let inputCity = document.querySelector("#city");
    if (stringValidity(inputCity.value)) {
      inputCity.style.border = "solid 2px green";
      document.querySelector("#cityErrorMsg").textContent = "";
      return true;
    }

    else {
      inputCity.style.border = "solid 2px red";
      document.querySelector("#cityErrorMsg").textContent = "La ville est mal renseignée";
      return false;
    }

  }

  // // ------------------------------------------------------------
  // GESTION DU CHAMPS ADRESSE EMAIL DANS LE FORMULAIRE

  function emailCheck() {

    let inputMail = document.querySelector("#email");
    if (emailValidity(inputMail.value)) {
      inputMail.style.border = "solid 2px green";
      document.querySelector("#emailErrorMsg").textContent = "";
      return true;
    }

    else {
      inputMail.style.border = "solid 2px red";
      document.querySelector("#emailErrorMsg").textContent = "L'adresse email saisie est incorrecte";
      return false;
    }

  }

  // // ------------------------------------------------------------
  // CONTRÔLE VALIDITÉ AVANT ENVOI SUR LE LOCAL STORAGE : 
  if (firstNameCheck() && lastNameCheck() && addressCheck() && cityCheck() && emailCheck()) {
    sendFromToServer();
  }
  else {
    alert("Veuillez complétez tous les champs du formulaire")
  }

  //   // // ------------------------------------------------------------
  //   // MÉTHODE POST POUR ENVOYER LA COMMANDE ET LE FORMULAIRE 

  function sendFromToServer() {
    const articleIds = articles.map(function (article) {
      return article.id
    })

    const data = { contact: contact, products: articleIds }

    const product = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })

    .then((response) => {
      return response.json();
    })

    .then((response) => {
      let orderId = response.orderId;

      if (orderId != "") {
      alert("Votre commande a bien été prise en compte");
      location.href = "confirmation.html?id=" + orderId;
      }
    })
  }
})//fin du listener COMMANDER

