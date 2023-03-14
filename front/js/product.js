// --------------------------------
// RÉCUPÉRATION DE L'ID POUR L'URL
// --------------------------------

const idProduct = window.location.search;
const urlParams = new URLSearchParams(idProduct);
const id = urlParams.get("id");
//console.log(id);
let color = document.getElementById("colors");


const product = await(await fetch("http://localhost:3000/api/products/" + id)).json();


displayProduct(product);

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

color.addEventListener("change", function(){
    console.log(color.value)
})

//-------------------------------------------------------------
// RÉCUPÉRATION DE LA VALUE SAISIE DANS L'INPUT QUANTITY
//-------------------------------------------------------------

let quantity = document.getElementById("quantity");
quantity.addEventListener("keyup", function () {
    //let quantityIput = parseInt(quantity.value)
    if (isNumber(quantity.value)) {
        console.log("c'est un chiffre");
    }
    else {
        console.log("c'est une lettre");

    }
})

// ------------------------------------------------------------
//FONCTION QUI VÉRIFIE QUE LA QUANTITÉ SAISIE EST UN NOMBRE
// ------------------------------------------------------------

const isNumber = function (number) {
    let regex = /^[0-9]+$/;             
    if (regex.test(number)) {
        return true;
    }
    else {
        return false;
    }
}


// ------------------------------------------------------------
// GESTION D'ÉVÈNEMENT DU BOUTON AJOUTER AU PANIER
// ------------------------------------------------------------

let buttonCart = document.getElementById("addToCart");
buttonCart.addEventListener("click", function () {
    if (isNumber(quantity.value) && quantity.value > 0) {
        alert("Vous avez choisi de commander " + quantity.value + " article(s)");
        quantity.value = 0;
    }
    else {
        alert("Vous n'avez pas saisi la bonne quantité");
        quantity.value = 0;
    }
})






// VIEUX CODE

//a href= "./product.html?id=${article._id}"
// searchProduct();
// async function searchProduct(){
//     await fetch("http://localhost:3000/api/products/a557292fe5814ea2b15c6ef4bd73ed83")
//       .then((response) => response.json())
//       .then((data) =>  displayProduct(data))
//       .catch (function(error) {
//         alert(error)
//       });
// }


        //for (let i = 0; i < product.colors.length; i++){
        //     let option = document.createElement("option");       // Boucle qui liste les différentes couleurs
        //     option.textContent = product.colors[i];
        //     let color = document.getElementById("colors");
        //     color.appendChild(option);

            //}
