// --------------------------------
// RÉCUPÉRATION DE L'ID POUR L'URL
// --------------------------------

const idProduct = window.location.search;
const urlParams = new URLSearchParams(idProduct);
const id = urlParams.get("id");
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
    return color.value
})


//-------------------------------------------------------------
// RÉCUPÉRATION DE LA VALUE SAISIE DANS L'INPUT QUANTITY
//-------------------------------------------------------------

let quantity = document.getElementById("quantity");
// quantity.addEventListener("change", function () {
//     if (parseInt(quantity.value) <= 0 || parseInt(quantity.value) > 100){
//         quantity.style.color = "red";
//         return false
//     } 
//     else{
//         quantity.style.color = "black";
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
            console.log("La vérification est OK")
        return true;
        }
    }
    else {
        console.log("La vérification n'est pas bonne")
        return false;
    }
}

// ------------------------------------------------------------
// GESTION D'ÉVÈNEMENT DU BOUTON AJOUTER AU PANIER
// ------------------------------------------------------------

let buttonCart = document.getElementById("addToCart");
buttonCart.addEventListener("click", function () {

    if (isNumber(parseInt(quantity.value)) && color.value != "") {
        alert("Vous avez choisi de commander " + quantity.value + " article(s) avec la couleur : " + color.value);
        quantity.value = 0;
        console.log(color.value + "IF1")
        }
    else {
        alert("Vous devez chosir une couleur et une quantité !");
        quantity.value = 0;
        console.log(color.value + "ELSE1")
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


// const isNumber = function (inputQuantity) {
//     if (Number.isNaN(parseInt(quantity.value))) {
//         //return 'Number NaN';
//         console.log(inputQuantity)
//         }
//         if (isNaN(parseInt(quantity.value))) {
//         //return 'NaN';
//         console.log(inputQuantity)
//         }
// }