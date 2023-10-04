import { act, renderHook } from '@testing-library/react';
import { buscaTransacoes } from '../services/transacoes';
import useListaTransacoes from './useListaTransacoes';

jest.mock('../services/transacoes.js');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '04/10/2023',
    mes: 'Outubro',
  },
];

describe('hooks/useListaTransacoes', () => {
  test('Deve retornar uma lista de transações e uma lista que a atualiza', async () => {
    buscaTransacoes.mockImplementation(() => mockTransacao);

    const { result } = renderHook(() => useListaTransacoes());

    expect(result.current[0]).toEqual([]);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockTransacao);
  });
});
