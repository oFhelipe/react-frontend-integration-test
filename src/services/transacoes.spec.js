import { buscaTransacoes, salvaTransacao } from './transacoes';
import api from './api';

jest.mock('./api');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '04/10/2023',
    mes: 'Outubro',
  },
];

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
        status: 201,
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
  api.post.mockClear();
});

describe('Requisições de transações para API', () => {
  test('Deve retornar uma lista de transações', async () => {
    api.get.mockImplementation(() => mockRequisicao(mockTransacao));
    const transacoes = await buscaTransacoes();

    expect(transacoes).toEqual(mockTransacao);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar uma lista vazia quando a requisição falhar', async () => {
    api.get.mockImplementation(() => mockRequisicaoErro());
    const transacoes = await buscaTransacoes();

    expect(transacoes).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  test('Deve salvar uma transação', async () => {
    api.post.mockImplementation(() => mockRequisicaoSalvar());
    const resultado = await salvaTransacao(mockTransacao);

    expect(resultado).toEqual(201);
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao);
    expect(api.post).toHaveBeenCalledTimes(1);
  });

  test('Deve Retornar uma mensagem de erro ao falhar a requisição de salvar uma transação', async () => {
    api.post.mockImplementation(() => mockRequisicaoErro());
    const resultado = await salvaTransacao(mockTransacao);

    expect(resultado).toEqual('Erro na requisição');
    expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao);
    expect(api.post).toHaveBeenCalledTimes(1);
  });
});
