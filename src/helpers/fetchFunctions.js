export const fetchProduct = async (productId) => {
  if (!productId) {
    throw new Error('ID não informado');
  }

  const URL = 'https://api.mercadolibre.com/items/';
  const response = await fetch(`${URL}${productId}`);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (query) => {
  if (!query) {
    throw new Error('Termo de busca não informado');
  }

  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const data = await response.json();
  const { results } = data;
  return results;
};
