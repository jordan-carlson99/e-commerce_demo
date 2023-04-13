// change this to env variables when modules aren't maddening
const apiURL = `https://e-commerce-api-qsvg.onrender.com`;
let pageUser = localStorage.getItem("pageUser") || {
  userName: "guest",
  full_name: "guest",
  email: "guest@email.com",
  password: "",
};

function generateMainCard(item) {
  let card = document.createElement("div");
  card.className = "card";
  card.id = item.id;
  let button = document.createElement("img");
  button.type = "button";
  button.className = "card-button";
  button.src = "/images/shopping_cart";
  button.addEventListener("click", (e) => {
    addToCart(e.target.parentNode);
  });
  card.innerHTML = `
    <h2 class="card-title">${item.product_name}</h2><br>
    <img src="/images/${item.product_name.toUpperCase()}" alt="" />
    <h3 class="card-price">${item.price}</h3>`;
  card.appendChild(button);
  document.getElementById("card-display-body").appendChild(card);
  document.querySelectorAll("br").forEach((element) => {
    element.remove();
  });
  return card;
}

function generateCartCard(item) {
  let card = document.createElement("div");
  card.className = "cart-card";
  card.id = `cart-${item.id}`;
  card.innerHTML = `
  <div class="cart-card-title">
  <h3>${item.product_name}</h3>
  </div>
  <div class="cart-card-quantity">
  <h4 id="${item.id}-quantity" class="cart-right">${item.quantity}</h4>
  <h4 id="${item.id}-price">${(parseFloat(item.price) * item.quantity).toFixed(
    2
  )}</h4>
  </div>`;
  let buttonDiv = document.createElement("div");
  buttonDiv.className = "cart-card-button";
  let quantityUp = document.createElement("button");
  quantityUp.innerText = "+";
  quantityUp.className = "cart-button";
  quantityUp.addEventListener("click", async (e) => {
    let cardID = item.id;
    let response = await fetch(
      `${apiURL}/cart/${pageUser.userName}/ADD/${cardID}`,
      {
        method: "PATCH",
      }
    );
    if (response.ok) {
      let data = await response.json();
      document.getElementById(
        `${cardID}-quantity`
      ).innerText = `${data[0].quantity}`;
      document.getElementById(`${cardID}-price`).innerText = `
      ${(
        parseFloat(
          document.getElementById(`${cardID}-price`).innerText /
            (data[0].quantity - 1)
        ) * data[0].quantity
      ).toFixed(2)}`;
    } else {
      let redirect = await response.json();
      fetch(`${apiURL}/cart/remove/${redirect[1]}/${redirect[2]}`, {
        method: redirect[0],
      });
      e.target.parentNode.parentNode.removeChild(
        document.getElementById(`${redirect[2]}`)
      );
    }
    document.querySelectorAll("br").forEach((element) => {
      element.remove();
    });
  });
  let quantityDown = document.createElement("button");
  quantityDown.innerText = "-";
  quantityDown.className = "cart-button";
  quantityDown.addEventListener("click", async (e) => {
    let cardID = item.id;
    let response = await fetch(
      `${apiURL}/cart/${pageUser.userName}/sub/${cardID}`,
      {
        method: "PATCH",
      }
    );
    if (response.ok) {
      let data = await response.json();
      document.getElementById(
        `${cardID}-quantity`
      ).innerText = `${data[0].quantity}`;
      document.getElementById(`${cardID}-price`).innerText = `
        ${(
          parseFloat(
            document.getElementById(`${cardID}-price`).innerText /
              (data[0].quantity + 1)
          ) * data[0].quantity
        ).toFixed(2)}`;
    } else {
      let redirect = await response.json();
      fetch(`${apiURL}/cart/remove/${redirect[1]}/${redirect[2]}`, {
        method: redirect[0],
      });
      e.target.parentNode.parentNode.parentNode.removeChild(
        document.getElementById(`cart-${redirect[2]}`)
      );
    }
    document.querySelectorAll("br").forEach((element) => {
      element.remove();
    });
  });
  buttonDiv.appendChild(quantityDown);
  buttonDiv.appendChild(quantityUp);
  card.appendChild(buttonDiv);
  document.getElementById("cart-body").appendChild(card);
}

/*
bean time with da peanut butter sauce 
*/

async function pageLoad() {
  let mainCard = await getProduct();
  let shoppingCard = await getCart(pageUser.userName);
  mainCard.forEach((element) => {
    generateMainCard(element);
  });
  shoppingCard.forEach((element) => {
    generateCartCard(element);
  });
  document
    .getElementById("sign-in-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      submitSignIn(e.target.parentNode);
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
    let quantity = document.getElementById(`${id}-quantity`);
    quantity.innerText = parseInt(quantity.innerText) + 1;
  } else {
    let cardInfo = {
      id: element.id,
      quantity: 1,
      price: element.children[2].innerText,
      product_name: element.children[0].innerText,
    };
    generateCartCard(cardInfo);
  }
}
async function submitSignIn() {
  let formData = new FormData(document.getElementById("sign-in-form"));
  let response = await fetch(
    `${apiURL}/login?userName=${formData.get(
      "userName"
    )}&password=${window.btoa(formData.get("password"))}`
  );
  if (response.ok) {
    let data = await response.json();
    document.getElementById("sign-in-container").classList.toggle("hidden");
    document.getElementById(
      "user-panel"
    ).innerText = `Welcome, ${data[0].username}`;
    pageUser.userName = data[0].username;
    pageUser.password = data[0].password;
    document.getElementById("cart-body").innerHTML = "";
    let shoppingCard = await getCart(pageUser.userName);
    shoppingCard.forEach((element) => {
      generateCartCard(element);
    });
  } else {
    return;
  }
}

function signInPopUp() {
  document.getElementById("sign-in-container").classList.toggle("hidden");
}
