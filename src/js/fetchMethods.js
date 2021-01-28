/* eslint-disable arrow-body-style */

export async function getAllElements() {
  try {
    const url = 'http://localhost:80/products';
    const products = await fetch(url).then((response) => {
      return response.json();
    });
    return products;
  } catch (err) {
    console.log(err);
    return { error: 'failed get' };
  }
}

export async function deleteElement(id) {
  try {
    const url = `http://localhost:80/product/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function addElement(product) {
  try {
    const url = 'http://localhost:80/product';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(product),
    });
    return response.ok;
  } catch (err) {
    console.log(err);
    return false;
  }
}
