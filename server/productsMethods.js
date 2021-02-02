const fs = require('fs');
const path = require('path');
//получение всех продуктов
module.exports.getAllElements = function getAllElements(fileJSON) {
  try {
    return JSON.parse(
      fs.readFileSync(fileJSON, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      })
    );
  } catch (err) {
    console.error({ error: 'Caanot read file' });
  }
};
//получение продукта по указанному id
module.exports.getElementId = function getElementId(fileJSON, id) {
  let product;
  try {
    product = JSON.parse(
      fs.readFileSync(fileJSON, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        }
      })
    );
  } catch (err) {
    console.error({ error: 'Caanot read file' });
  }
  const prodcutIndex = product.findIndex((element, index, array) => {
    if (element.id === id) {
      return true;
    }
  });
  if (prodcutIndex !== -1) {
    return product[prodcutIndex];
  } else return { error: 'wrong id' };
};
//добавление нового продукта
module.exports.addElement = function addElement(fileJSON, newProduct) {
  let product;
  try {
    product = JSON.parse(
      fs.readFileSync(fileJSON, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        }
      })
    );
  } catch (err) {
    console.error({ error: 'Caanot read file' });
  }
  product.push(newProduct);
  fs.writeFileSync(fileJSON, JSON.stringify(product), (err) => {
    if (err) {
      console.error(err);
      return { error: 'failed add' };
    }
  });
  return { result: 'ok' };
};
//удаление продукта
module.exports.deleteElement = function deleteElement(fileJSON, id) {
  let product;
  try {
    product = JSON.parse(
      fs.readFileSync(fileJSON, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        }
      })
    );
  } catch (err) {
    console.error({ error: 'Caanot read file' });
  }
  let deleteIndex = product.findIndex((element, index, array) => {
    if (element.id === id) {
      return true;
    }
  });
  if (deleteIndex !== -1) {
    product.splice(deleteIndex, 1);
    fs.writeFileSync(fileJSON, JSON.stringify(product), (err) => {
      if (err) {
        console.error(err);
        return { error: 'failed delete' };
      }
    });
    return { result: 'ok' };
  }
  return { error: 'failed delete' };
};
//обновление существующего продукта по указанному id
module.exports.updateElements = function updateElements(fileJSON, id, newProduct) {
  let product;
  try {
    product = JSON.parse(
      fs.readFileSync(fileJSON, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        }
      })
    );
  } catch (err) {
    console.error({ error: 'Caanot read file' });
  }
  let productindex = product.findIndex((element, index, array) => {
    if (element.id === id) {
      return true;
    }
  });
  if (productindex !== -1) {
    product[productindex] = newProduct;
    fs.writeFileSync(fileJSON, JSON.stringify(product), (err) => {
      if (err) {
        console.error(err);
        return { error: 'failed update' };
      }
    });
    return { result: 'ok' };
  } else {
    return { error: 'failed update' };
  }
};
//console.log(getAllElements(JSONfileName));
//console.log(getElementId(JSONfileName, 2));
//addElement(JSONfileName, 'BMW', 4500000, 10);
//deleteElement(JSONfileName, 5);
//updateElements(JSONfileName,"Toyota",3500000,25,4);
