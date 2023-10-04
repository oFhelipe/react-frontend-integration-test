import { act, renderHook } from '@testing-library/react';
import { buscaSaldo } from '../services/saldo';
import useSaldo from './useSaldo';

jest.mock('../services/saldo.js');

const mockValor = {
  valor: 50,
};

describe('hooks/useSaldo', () => {
  test('Deve retornar o saldo com a função que atualiza o saldo', async () => {
    buscaSaldo.mockImplementation(() => mockValor.valor);
    const { result } = renderHook(() => useSaldo());

    expect(result.current[0]).toBe(0);

    await act(async () => {
      result.current[1]();
    });

    expect(result.current[0]).toEqual(mockValor.valor);
  });
});
