// --------------------------------
// FONCTION QUI CONNECTE L'API
// --------------------------------
//a href= "./product.html?id=${article._id}"
searchProduct();
async function searchProduct(){
    await fetch("http://localhost:3000/api/products/a557292fe5814ea2b15c6ef4bd73ed83")
      .then((response) => response.json())
      .then((data) =>  displayProduct(data))
      .catch (function(error) {
        alert(error)
      });
}

// --------------------------------
// FONCTION QUI AFFICHE LE PRODUIT
// --------------------------------

function displayProduct(data){
    if (data != null){
        let item__img = document.querySelector(".item__img");
        item__img.innerHTML += `<img src="${data.imageUrl}" alt="test">`;
        console.log(data.imageUrl);

        let price = document.getElementById("price");
        price.innerHTML = data.price;

        let description = document.getElementById("description");
        description.textContent = data.description;

       for (let i = 0; i < data.colors.length; i++){
        let option = document.createElement("option");              // Liste les différentes couleurs
        option.textContent = data.colors[i];
        let color = document.getElementById("colors");
        color.appendChild(option);
        }
    }   
    else{
        console.log("Erreur dans la récupération du produit");
    }                             
}


