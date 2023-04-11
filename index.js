// change this to env variables when modules aren't maddening
const apiURL = `http://127.0.0.15:3500`;

function generateMainCard(item) {
  let card = document.createElement("div");
  card.className = "card";
  card.id = item.id;
  let button = document.createElement("button");
  button.type = "button";
  button.className = "card-button";
  button.innerText = "add to cart";
  button.addEventListener("click", (e) => {
    // addToCart(e.target.parentNode)
    console.log(e.target.parentNode);
  });
  card.innerHTML = `
    <h2 class="card-title">${item.product_name}</h2><br>
    <img src="" alt="" />picture
    <h3 class="card-price">${item.price}</h3>`;
  card.appendChild(button);
  document.getElementById("card-display-body").appendChild(card);
  return card;
}

async function pageLoad() {
  let data = await getProduct();
  data.forEach((element) => {
    generateMainCard(element);
  });
}

async function getProduct(id) {
  id = id || "ALL";
  return (await fetch(`${apiURL}/products/ALL`)).json();
}
/*
      <div id="card-display-body" class="main">
        <div class="card">
          <h2>product name</h2>
          <h3>price</h3>
          <img src="" alt="" />picture
          <button>add to cart</button>
        </div>
*/
