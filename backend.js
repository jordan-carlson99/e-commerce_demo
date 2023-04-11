import express from "express";
const app = express();
import pg from "pg";
const { Client } = pg;
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const connectionString =
  process.env.connectionString ||
  "postgres://username:password@host:port/database";
const port = process.env.backPort || "127.0.0.1";
console.log(port);
const url = process.env.backURL || 3500;
const client = new Client(connectionString);

client.connect();

app.use(express.json());

app.use(cors());

app.get("/products/:id", (req, res) => {
  if (req.params.id == "ALL") {
    client.query(`SELECT * FROM product;`).then((result) => {
      res.send(result.rows);
    });
  } else {
    client
      .query(`SELECT * FROM product WHERE id=$1;`, [req.params.id])
      .then((result) => {
        res.send(result.rows);
      });
  }
});

app.get("/users/:username", (req, res) => {
  if (req.params.username == "ALL") {
    client.query(`SELECT * FROM customer;`).then((result) => {
      res.send(result.rows);
    });
  } else {
    client
      .query(`SELECT * FROM customer WHERE username=$1`, [req.params.username])
      .then((result) => {
        res.send(result.rows);
      });
  }
});

app.get("/cart/:user", (req, res) => {
  if (req.params.user == "ALL") {
    client.query(`SELECT * FROM customer_product`).then((result) => {
      res.send(result.rows);
    });
  } else {
    client
      .query(`SELECT * FROM customer_product WHERE user_id=$1`, [
        req.params.user,
      ])
      .then((result) => {
        res.send(result.rows);
      });
  }
});

// when client adds or removes a quantity from their cart
app.patch("/cart/:customer/:add/:product", async (req, res, next) => {
  let adder = "";
  if (req.params.add == "ADD") {
    adder += "+1";
  } else {
    adder += "-1";
  }
  let response = await client.query(
    `UPDATE customer_product SET
  quantity=quantity${adder} WHERE user_id=$1 AND product_id=$2 RETURNING *`,
    [req.params.customer, req.params.product]
  );
  let data = await response.rows[0].quantity;
  if (data > 0) {
    res.send("Modified");
  } else {
    // add in handler in app.js for sending a delete when it recieves this
    res.send(["DELETE", req.params.customer, req.params.product]);
  }
});

// customer removes item from cart
app.delete("/cart/remove/:customer/:product", (req, res) => {
  client
    .query(`DELETE FROM customer_product WHERE user_id=$1 AND product_id=$2;`, [
      req.params.customer,
      req.params.product,
    ])
    .then(res.send("sucess"));
});

// customer adds new item to cart
app.post("/newCart/:customer/:product", async (req, res) => {
  let data = await client.query(
    `SELECT * FROM customer_product WHERE $1=user_id AND $2=product_id`,
    [req.params.customer, req.params.product]
  );
  if (data.rowCount < 1) {
    client
      .query(
        `INSERT INTO customer_product (user_id,product_id,quantity)
    VALUES ($1,$2,1) RETURNING *`,
        [req.params.customer, req.params.product]
      )
      .then((result) => {
        res.send(result.rows);
      });
  } else {
    res.send(["PATCH", req.params.customer, req.params.product]);
  }
});

app.listen(port, url, () => {
  console.log(`backend listening on port ${port} at ${url}`);
});
