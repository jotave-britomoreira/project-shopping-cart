import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import './style.css';

const productSection = document.querySelector('.products');

function requestError() {
  const error = document.createElement('error');
  error.className = 'error';
  error.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  productSection.appendChild(error);
}

async function productList() {
  try {
    const loading = document.createElement('loading');
    productSection.appendChild(loading);
    loading.className = 'loading';
    loading.innerText = 'carregando...';
    const productsList = await fetchProductsList('computador');
    productsList.forEach((product) => {
      productSection.appendChild(createProductElement(product));
    });
  } catch (erro) {
    requestError();
  }
  const loading = document.querySelector('.loading');
  loading.remove();
}
productList();

const shopCart = async () => {
  const savedId = getSavedCartIDs();
  const arrayPromises = savedId.map(async (id) => fetchProduct(id));
  const cartProducts = await Promise.all(arrayPromises);
  cartProducts.forEach((product) => {
    const cartProduct = createCartProductElement(product);
    const cartList = document.querySelector('.cart__products');
    cartList.appendChild(cartProduct);
  });
};

document.querySelector('.cep-button').addEventListener('click', searchCep);

window.onload = shopCart();
