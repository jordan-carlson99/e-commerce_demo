// change this to env variables when modules aren't maddening
const apiURL = `http://127.0.0.15:3500`;
const pageUser = {
  userName: "guest",
  full_name: "guest",
  email: "guest@email.com",
  password: "",
};

function generateMainCard(item) {
  let card = document.createElement("div");
  card.className = "card";
  card.id = item.id;
  let button = document.createElement("button");
  button.type = "button";
  button.className = "card-button";
  button.innerText = "add to cart";
  button.addEventListener("click", (e) => {
    addToCart(e.target.parentNode);
    // console.log(e.target.parentNode);
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

async function addToCart(element) {
  let id = element.id;
  let user = pageUser.userName;
  let response = await fetch(`${apiURL}/newCart/${user}/${id}`, {
    method: "POST",
  });
  let data = await response.json();
  if (data[0] == "PATCH") {
    response = await fetch(`${apiURL}/cart/${user}/ADD/${id}`, {
      method: "PATCH",
    });
  } else {
    //card
  }
}
