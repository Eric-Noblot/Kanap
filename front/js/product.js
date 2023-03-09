// --------------------------------
// RÉCUPÉRATION DE L'ID POUR L'URL
// --------------------------------

const idProduct = window.location.search;
const urlParams = new URLSearchParams(idProduct);
const id = urlParams.get("id");
console.log(id);

const products = await(await fetch("http://localhost:3000/api/products/" + id)).json();
displayProduct(products);

// --------------------------------
// FONCTION QUI AFFICHE LE PRODUIT
// --------------------------------

function displayProduct(product){
    //console.log(product);
    if (product != null){
        let item__img = document.querySelector(".item__img");
        item__img.innerHTML += `<img src="${product.imageUrl}" alt="Photo d'un canapé">`;

        let price = document.getElementById("price");
        price.innerHTML = product.price;

        let description = document.getElementById("description");
        description.textContent = product.description;

       for (let i = 0; i < product.colors.length; i++){
        let option = document.createElement("option");       // Boucle qui liste les différentes couleurs
        option.textContent = product.colors[i];
        let color = document.getElementById("colors");
        color.appendChild(option);
        }
    }   
    else{
        console.log("Erreur dans la récupération du produit");
    }                             
}




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