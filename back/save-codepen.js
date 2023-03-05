const url = 'http://localhost:3000/api/products/';

//function recupererArticle() {
  // Créer une requête
  let requete = new XMLHttpRequest(); // Créer un objet
  requete.open('GET', url); // Premier paramètre GET / POST, deuxième paramètr : url
  requete.responseType = 'json'; // Nous attendons du JSON
  requete.send(); // Nous envoyons notre requête

  // Dèss qu'on reçoit une réponse, cette fonction est executée
  requete.onload = function() {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
      let reponse = requete.response; // on stock la réponse
      const index = (reponse.length);
        
      for (i = 0; i < index; i++){
      
      let img = document.querySelector("img");
      //img.src = reponse[2].imageUrl;
      let h3 = document.querySelector("h3");
      h3 = reponse[i].name;
        
      let p = document.querySelector("p");
        p = reponse[i].description;
        console.log(h3, p);
      //p.textContent = reponse[1].description;
        
      // let prix = document.createElement("div");
      //     prix.innerText = `Prix: ${index.prix} € (${index.prix < 35 ? "€" : "€€€"})`;
      //     document.body.append(prix);
      //   console.log(prix);
      }
      }
      else {
        alert('Un problème est intervenu, merci de revenir plus tard.');
      }
    
  }
  }
//}

<img src="${article.imageURL}" alt="${article.altTxt}">