import express from "express";
const app = express();
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

let pathToFile = path.resolve("./");
dotenv.config();
const port = process.env.frontPort || 3000;
const url = process.env.frontURL || "127.0.0.1";

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.get("/", (req, res) => {
  res.sendFile(`${pathToFile}/index.html`);
});

app.get("/index", (req, res) => {
  res.sendFile(`${pathToFile}/index.js`);
});

app.get("/styles", (req, res) => {
  res.sendFile(`${pathToFile}/styles.css`);
});

app.get("/images/:image", (req, res) => {
  res.sendFile(`${pathToFile}/images/${req.params.image}.jpg`);
});
// app.get("/login", (req, res, next) => {
//   console.log(req.query);
//   next();
// });

// app.use("*", (req, res) => {
//   res.sendFile(`${pathToFile}/index.html`);
// });

app.listen(port, url, () => {
  console.log(`front end ruinning on ${url}:${port}`);
});
