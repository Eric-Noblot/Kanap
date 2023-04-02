
// ------------------------------------------------
// AJOUTE TOUS LES ARTICLES À LA PAGE D'ACCUEIL
// ------------------------------------------------

addArticles()

async function addArticles(){
try {
  const products = await(await fetch("http://localhost:3000/api/products")).json();

  for (let i = 0; i < products.length; i++) {
    let article = products[i];
    document.querySelector("#items").innerHTML +=
      `
          <a href= "./product.html?id=${article._id}">
          <article>
          <img src="${article.imageUrl}" alt="${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
          </article>
          </a>`;
  }
}
catch (error) {
  console.log("Une erreur est survenue : ", error); 
}

}




