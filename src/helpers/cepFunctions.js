const URL_1 = 'https://cep.awesomeapi.com.br/json/';
const URL_2 = 'https://brasilapi.com.br/api/cep/v2/';

export const getAddress = async (cep) => {
  const response = await Promise.any([
    fetch(`${URL_1}${cep}`),
    fetch(`${URL_2}${cep}`),
  ]);

  if (!cep || !response.ok) {
    throw new Error('CEP não encontrado');
  }

  const data = await response.json();
  return data;
};

const cepInput = document.querySelector('.cep-input');
const addressCep = document.querySelector('.cart__address');

export const searchCep = async () => {
  try {
    const cep = await getAddress(cepInput.value);
    const fullAddress = `${cep.address} - ${cep.district} - ${cep.city} - ${cep.state}`;
    addressCep.innerText = fullAddress;
  } catch (error) {
    addressCep.innerText = 'CEP não encontrado';
  }
};
