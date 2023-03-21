function addProduct(product){
    let article = getArticle();
    let foundIdProduct = article.find(function(element){
        return element.id == product.id
    });

    let foundColorProduct = article.find(function(element){
        return element.color == product.color
    });

    if (foundIdProduct != undefined && foundColorProduct != undefined){     // si le produit ET la couleur exite déjà dans le panier
        console.log("foundColorProduct" + foundColorProduct)         
        let productQuantity = 0
        console.log("il y avait déjà un produit")
        console.log("quantité tapée: " + quantity.value)
        console.log("quantité dans le Local: " + foundIdProduct.quantity)
        productQuantity = parseInt(quantity.value) + foundIdProduct.quantity
        console.log("quantité après addition:" + productQuantity)

    }
    else {                    
        console.log("foundColorProduct" + foundColorProduct)           
        article.push(product);
        console.log("il n'y a pas de quantité trouvée, on push")
        console.log("quantité tapée: " + quantity.value)
        console.log("quantité dans le Local: " + product.quantity)
    }
    addArticle(article);
}



// ;----------------------------------------------------------
//FONCTION QUI CALCULE LA QUANTITE

function getNumberProduct(){
    let article = getArticle();
    let number = 0;
    for (let product of article){
        number += product.quantity;
    }
    return number;
}

function getTotalPrice(){
    let article = getArticle();
    let total = 0;
    for (let product of article){
        total += product.quantity * product.price;
    }
    return total
}

let prixTotal = getTotalPrice();
console.log(prixTotal)