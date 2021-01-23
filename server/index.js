const fs = require('fs');
const path = require('path');
const JSONfileName = path.resolve(__dirname, 'products.json');
const original = require('./productsMethods.js');
const express = require('express');
const { METHODS } = require('http');
const app = express();
app.use(express.json());

app.get('/products', (req, res) => {
  res.send(original.getAllElements(JSONfileName));
});

app.get("/product/:id", (req, res) => {
  res.send(original.getElementId(JSONfileName, Number(req.params.id)));
  if(!isNaN(id)){
    const result = productsMethods.getElementId(jsonFileName, id, req.body);
    res.send(result);
  }
  else{
    res.status(404).send({ error: 'Incorrect id' });
  }
});

app.post('/product', (req, res) => {
    let result = original.addElement(JSONfileName, req.body);
    res.send(result);
});

app.delete("/product/:id", (req, res) => {
    res.send(original.deleteElement(JSONfileName, Number(req.params.id)))
    if(!isNaN(id)){
      const result = productsMethods.deleteElement(jsonFileName, id, req.body);
      res.send(result);
    }
    else{
      res.status(404).send({ error: 'Incorrect id' });
    }
});

app.put('/product/:id', (req, res) => {
  res.send(original.updateElements(JSONfileName, Number(req.params.id)))
  if(!isNaN(id)){
    const result = productsMethods.updateElements(jsonFileName, id, req.body);
    res.send(result);
  }
  else{
    res.status(404).send({ error: 'Incorrect id' });
  }
});

app.listen(80, (err) => {
    if (err) return console.log('something bad happened', err);
    console.log('server is listening 80');
});