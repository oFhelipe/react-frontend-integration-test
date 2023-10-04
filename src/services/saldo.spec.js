import { buscaSaldo, atualizaSaldo } from './saldo';
import api from './api';

jest.mock('./api');

const mockRetornoRequisicaoSaldo = {
  valor: 50,
};

const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: retorno,
      });
    }, 200);
  });
};

const mockRequisicaoSalvar = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
      });
    }, 200);
  });
};

const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
};

beforeEach(() => {
  api.get.mockClear();
  api.put.mockClear();
});

describe('Requisições de saldo para API', () => {
  test('Deve retornar o valor do saldo', async () => {
    api.get.mockImplementation(() =>
      mockRequisicao(mockRetornoRequisicaoSaldo)
    );
    const saldo = await buscaSaldo();
    expect(saldo).toEqual(mockRetornoRequisicaoSaldo.valor);
    expect(api.get).toHaveBeenCalledWith('/saldo');
  });

  test('Deve retornar o valor 1000 de saldo caso algum erro na requisição', async () => {
    api.get.mockImplementation(() =>
      mockRequisicaoErro(mockRetornoRequisicaoSaldo)
    );
    const saldo = await buscaSaldo();
    expect(saldo).toEqual(1000);
    expect(api.get).toHaveBeenCalledWith('/saldo');
  });

  test('Deve retornar status ao salvar o saldo', async () => {
    api.put.mockImplementation(() => mockRequisicaoSalvar());
    await atualizaSaldo(10);
    expect(api.put).toHaveBeenCalledWith('/saldo', { valor: 10 });
    expect(api.put).not.toThrow();
  });
});
