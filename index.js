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

function generateCartCard(item) {
  let card = document.createElement("div");
  card.className = "cart-card";
  card.id = item.id;
  card.innerHTML = `
  <h3>${item.product_name}</h3>
  <h4 id="${item.id}-quantity">${item.quantity}</h4>
  <h4 id="${item.id}-price">${parseFloat(item.price) * item.quantity}</h4>`;
  let quantityUp = document.createElement("button");
  quantityUp.innerText = "+";
  quantityUp.addEventListener("click", async (e) => {
    let response = await fetch(
      `${apiURL}/cart/${pageUser.userName}/ADD/${e.target.parentNode.id}`,
      {
        method: "PATCH",
      }
    );
    if (response.ok) {
      let data = await response.json();
      document.getElementById(
        `${e.target.parentNode.id}-quantity`
      ).innerText = `${data[0].quantity}`;
      document.getElementById(`${e.target.parentNode.id}-price`).innerText = `
      ${(
        parseFloat(
          document.getElementById(`${e.target.parentNode.id}-price`).innerText /
            (data[0].quantity - 1)
        ) * data[0].quantity
      ).toFixed(2)}`;
    }
  });
  let quantityDown = document.createElement("button");
  quantityDown.innerText = "-";
  quantityDown.addEventListener("click", async (e) => {
    let response = await fetch(
      `${apiURL}/cart/${pageUser.userName}/sub/${e.target.parentNode.id}`,
      {
        method: "PATCH",
      }
    );
    if (response.ok) {
      let data = await response.json();
      document.getElementById(
        `${e.target.parentNode.id}-quantity`
      ).innerText = `${data[0].quantity}`;
      document.getElementById(`${e.target.parentNode.id}-price`).innerText = `
        ${(
          parseFloat(
            document.getElementById(`${e.target.parentNode.id}-price`)
              .innerText /
              (data[0].quantity + 1)
          ) * data[0].quantity
        ).toFixed(2)}`;
    }
  });
  let removeCart = document.createElement("button");
  card.appendChild(quantityUp);
  card.appendChild(quantityDown);
  document.getElementById("cart-body").appendChild(card);
}

/*
bean time with da peanut butter sauce 
        <div class="cart-card">
          <h3>title</h3>
          <h4>price</h4>
          <button>quantity+</button>
          <button>quantity-</button>
          <button>remove from cart</button>
        </div>
*/

async function pageLoad() {
  let mainCard = await getProduct();
  let shoppingCard = await getCart(pageUser.userName);
  mainCard.forEach((element) => {
    generateMainCard(element);
  });
  console.log(shoppingCard);
  shoppingCard.forEach((element) => {
    generateCartCard(element);
  });
}

async function getProduct(id) {
  id = id || "ALL";
  return (await fetch(`${apiURL}/products/ALL`)).json();
}

async function getCart(user_id) {
  user_id = user_id || "guest";
  return (await fetch(`${apiURL}/cart/${user_id}`)).json();
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
