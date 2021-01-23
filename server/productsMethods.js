const fs = require('fs');
const path = require('path');
//получение всех продуктов
module.exports.getAllElements = function getAllElements(fileJSON) {
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
module.exports.getElementId = function getElementId(fileJSON, id){
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
module.exports.addElement = function addElement(fileJSON, product) {
  let productsList;
  try {
    productsList = JSON.parse(
      fs.readFileSync(fileJSON, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        }
      })
    );
  } catch (error) {
    console.error(error);
    return false;
  }

  productsList.push(product);
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
    }
  });
  return true;
};
//удаление продукта
module.exports.deleteElement = function deleteElement(fileJSON, id) {
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
module.exports.updateElements = function updateElements(fileJSON, newProductName, newProductPrice, newProductAmount, newId){
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
//console.log(getAllElements(JSONfileName));
//console.log(getElementId(JSONfileName, 2));
//addElement(JSONfileName, 'BMW', 4500000, 10);
//deleteElement(JSONfileName, 5);
//updateElements(JSONfileName,"Toyota",3500000,25,4);