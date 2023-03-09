const products = await(await fetch("http://localhost:3000/api/products")).json();

//textDisplay();


// -------------------------------------------
//FONCTION QUI AFFICHE LES ÉLÉMENTS DU PANIER
// -------------------------------------------

function textDisplay() {
  //products.forEach(product => console.log(product.name));
  products.forEach(function (product) {
    let article = document.querySelector("#cart__items").innerHTML +=
      `
 <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
  `
  })
}

// --------------------------------
// INPUTS ET FORMULAIRE
// --------------------------------

const order = document.querySelector("#order");
order.addEventListener("submit", function () {
  alert("Go !");
})

ValidForm()
function ValidForm(){
  let input = document.getElementById("firstName");
  input.addEventListener("keyup", function () {
    let regex = /^[a-zA-Z-_éÉèÈêÊëËâÂäÄàÀôÔöÖ ]+$/;    //Utilier new Regex ?
    if (input.value == "") {
      let error = document.querySelector("#firstNameErrorMsg");
      error.textContent = "Vous devez saisir votre prénom !";
      error.style.display = "inline";
      error.style.color = "red";
    } else if (regex.test(input.value) === false) {
      let error = document.querySelector("#firstNameErrorMsg");
      error.textContent = "Vous devez saisir des caractères valides";
      error.style.display = "inline";
      error.style.color = "red";
    }
    else{
      let error = document.querySelector("#firstNameErrorMsg");
      error.style.display = "none";
    }
  })
}   // TESTER LE SWITCH !!!


// ValidForm(firstname);
// function ValidForm(element){
//   let input = document.getElementById(`${element}`);
//   input.addEventListener("keyup", function () {
//     let regex = /^[a-zA-Z-_éÉèÈêÊëËâÂäÄàÀôÔöÖ ]+$/;    //Utilier new Regex ?
//     if (input.value == "") {
//       let error = document.querySelector(`#${element}ErrorMsg`);
//       error.textContent = "Vous devez saisir votre prénom !";
//       error.style.display = "inline";
//       error.style.color = "red";
//     } else if (regex.test(input.value) === false) {
//       let error = document.querySelector(`${element}ErrorMsg`);
//       error.textContent = "Vous devez saisir des caractères valides";
//       error.style.display = "inline";
//       error.style.color = "red";
//     }
//     else{
//       let error = document.querySelector(`${element}ErrorMsg`);
//       error.style.display = "none";
//     }
//   })
// }



// let input = document.querySelector("firstname");
// form.addEventListener("change", function(e){
//   console.log(input);
// })


// let lastname = document.getElementById("lastName");
// let address = document.getElementById("address");
// let city = document.getElementById("city");
// let email = document.getElementById("email");

