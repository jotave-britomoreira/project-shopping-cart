import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

describe('Teste a função fecthProduct', () => {
  it('1. Testa se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('2. Executa a função fetchProduct com o argumento "MLB1405519561" e testa se fetch foi chamada', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('3. Testa se, ao chamar a função fetchProduct com o argumento "MLB1405519561", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1405519561)";', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
    });

    it('4. Testa se o retorno da função fetchProduct com o argumento "MLB1405519561" é uma estrutura de dados igual ao objeto produto', async () => {
    await expect(fetchProduct('MLB1405519561')).resolves.toEqual(product);
  });

  it('5. Testa se, ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem: ID não informado', async () => {
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});
