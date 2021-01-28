/* eslint-disable no-param-reassign /
/ eslint-disable comma-dangle /
/ eslint-disable no-loop-func /
/ eslint-disable no-undef /
/ eslint-disable object-curly-newline */

import 'regenerator-runtime/runtime';
import { getAllElements, deleteElement, addElement } from './fetchMethods';

let productsList;
window.onload = function upload() {
  async function updateUI() {
    productsList = await getAllElements();

    const source = document.getElementById('store-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({ productsList });
    document.getElementById('result-table').innerHTML = html;

    const buttonAdd = document.querySelector('.button-add');
    const formAdd = document.querySelector('.form--add');
    buttonAdd.addEventListener('click', () => {
      formAdd.style.display = 'block';
    });
    const buttonCloseform = formAdd.querySelector('.form-close');
    buttonCloseform.addEventListener('click', () => {
      formAdd.style.display = 'none';
    });
    window.onclick = function (event) {
      if (event.target === formAdd) {
        formAdd.style.display = 'none';
      }
    };
    const formAddProduct = document.querySelector('.add-product');
    formAddProduct.onsubmit = async (e) => {
      e.preventDefault();
      const id = productsList.length === 0 ? 1 : productsList[productsList.length - 1].id + 1;
      const product = {
        id,
        product_name: formAddProduct.querySelector('.add-product-name').value,
        product_amount: formAddProduct.querySelector('.add-product-amount').value,
        product_price: formAddProduct.querySelector('.add-product-price').value,
      };
      if (await addElement(product)) {
        alert('Product added');
        formAdd.style.display = 'none';
      } else {
        alert('Product has not been added');
        formAdd.style.display = 'none';
      }
      updateUI();
    };

    document.querySelectorAll('.button-delete').forEach((element) => {
      element.addEventListener('click', async (event) => {
        const id = event.target.id.replace('delete-', '');
        if (await deleteElement(id)) {
          alert('Product removed');
        } else {
          alert('Product has not been deleted');
        }
        updateUI();
      });
    });
  }
  updateUI();
};