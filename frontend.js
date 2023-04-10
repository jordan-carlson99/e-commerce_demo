import express from "express";
const app = express();
import path from "path";
import dotenv from "dotenv";

let pathToFile = path.resolve("./");
dotenv.config();
const port = process.env.frontPort || 3000;
const url = process.env.frontURL || "127.0.0.1";

app.get("/", (req, res) => {
  res.sendFile(`${pathToFile}/index.html`);
});

app.listen(port, url, () => {
  console.log(`front end running on port ${port} at ${url}`);
});
