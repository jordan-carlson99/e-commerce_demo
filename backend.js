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

app.listen(port, url, () => {
  console.log(`backend listening on port ${port} at ${url}`);
});
