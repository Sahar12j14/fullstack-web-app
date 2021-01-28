const fs = require("fs");
const path = require("path");
const JSONfileName = path.resolve(__dirname, "products.json");
const original = require("./productsMethods.js");
const express = require("express");
const { METHODS } = require("http");
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.get("/products", (req, res) => {
  res.send(original.getAllElements(JSONfileName));
});

app.get("/product/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!isNaN(id)) {
    const result = original.getElementId(JSONfileName, id, req.body);
    res.send(result);
  } else {
    res.status(404).send({ error: "Incorrect id" });
  }
});

app.post("/product", (req, res) => {
  let result = original.addElement(JSONfileName, req.body);
  res.send(result);
});

app.delete("/product/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!isNaN(id)) {
    const result = original.deleteElement(JSONfileName, id, req.body);
    res.send(result);
  } else {
    res.status(404).send({ error: "Incorrect id" });
  }
});

app.put("/product/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!isNaN(id)) {
    const result = original.updateElements(JSONfileName, id, req.body);
    res.send(result);
  } else {
    res.status(404).send({ error: "Incorrect id" });
  }
});

app.listen(80, (err) => {
  if (err) return console.log("something bad happened", err);
  console.log("server is listening 80");
});