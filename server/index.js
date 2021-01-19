const fs = require('fs');
const path = require('path');
const JSONfileName = path.resolve(__dirname, 'products.json');
const express = require('express');
const app = express();

app.get('/products', (req, res) => {
  res.send(getAllProducts(JSONfileName));
});

app.get("/product/:id", (req, res) => {
  res.send(getElementId(JSONfileName, Number(req.params.id)));
});
app.listen(80);

//получение всех продуктов
function getAllProducts(fileJSON) {
  return JSON.parse(
    fs.readFileSync(fileJSON, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    })
  );
}
//получение продукта по указанному id
function getElementId(fileJSON, id){
    let product = JSON.parse(
        fs.readFileSync(fileJSON, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
        })
      );
    for (let i = 0; i < product.length; i++) {
        if (product[i].id === id) {
          return product[i];
        }
    }
}
//добавление нового продукта
function addElement(fileJSON, newProductName, newProductPrice, newProductAmount){
    let product = JSON.parse(
        fs.readFileSync(fileJSON, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
          }
        })
      );
      let lastId = product[product.length - 1].id;
      product.push({
        id: lastId + 1,
        product_name: newProductName,
        product_price: newProductPrice,
        product_amount: newProductAmount,
      });
      fs.writeFileSync(fileJSON, JSON.stringify(product), (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
//удаление продукта
function deleteElement(fileJSON, id) {
  const product = JSON.parse(
    fs.readFileSync(fileJSON, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    })
  );
  let deleteIndex = product.findIndex((element, index, array) => {
    if (element.id === id) {
      return true;
    }
  });
  if (deleteIndex !== (-1)){
    product.splice(deleteIndex, 1);
    fs.writeFileSync(fileJSON, JSON.stringify(product), (err) => {
      if (err) {
        console.error(err);
      }
    });
    return true;
  }
}
//обновление существующего продукта по указанному id
function update(fileJSON, newProductName, newProductPrice, newProductAmount, newId){
  let newProduct = {
    id: newId,
    product_name: newProductName,
    product_price: newProductPrice,
    product_amount: newProductAmount,
  };
  const product = JSON.parse(
    fs.readFileSync(fileJSON, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    })
  );
  product[
    product.findIndex(function searchById(element, index, array) {
      if (element.id === newId) {
        return true;
      }
    })
  ] = newProduct;
  fs.writeFileSync(fileJSON, JSON.stringify(product), (err) => {
    if (err) {
      console.error(err);
    }
  });
}
//console.log(getAllProducts(JSONfileName));
//console.log(getElementId(JSONfileName, 2));
//addElement(JSONfileName, 'BMW', 4500000, 10);
//deleteElement(JSONfileName, 5);
//console.log(update(JSONfileName,"Toyota",3500000,25,4));