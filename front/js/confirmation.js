const url = new URLSearchParams(document.location.search);
const id = url.get("id");
const orderId = id;

const idConfirmation = document.querySelector("#orderId");

idConfirmation.innerHTML = `<span id="orderId"><strong>${orderId}</strong><br>Merci pour votre commande !</span>`;
  
localStorage.clear();