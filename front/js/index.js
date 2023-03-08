
// ------------------------------------------------
// AJOUTE TOUS LES ARTICLES À LA PAGE D'ACCUEIL
// ------------------------------------------------

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
          console.log(article._id);
  }
}
catch (error) {
  console.log("Une erreur est survenue : ", error);
}




// async function addArticles(){

//   await fetch("http://localhost:3000/api/products")
//     .then((response) => response.json())
//     .then((data) => {

//       for (let i = 0; i < data.length; i++){
//       let article = data[i];
//       document.querySelector("#items").innerHTML +=
//       `
//       <a href= "./product.html?id=${article._id}">
//       <article>
//       <img src="${article.imageUrl}" alt="${article.altTxt}">
//       <h3 class="productName">${article.name}</h3>
//       <p class="productDescription">${article.description}</p>
//       </article>
//       </a>`;
//       }
//       console.log(article._id);
//     })
//     .catch((error)=>
//       console.log(error)
//     );
// }

// addArticles();





