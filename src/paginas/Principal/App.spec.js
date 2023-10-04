import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import AppRoutes from '../../routes';
import { BrowserRouter } from 'react-router-dom';

describe('Componente <App />', () => {
  test('Deve permitir adicionar uma transacao em extrato', () => {
    render(<App />, { wrapper: BrowserRouter });
    const select = screen.getByRole('combobox');
    const campoValor = screen.getByPlaceholderText('Digite um valor');
    const botao = screen.getByRole('button');

    userEvent.selectOptions(select, ['Depósito']);
    userEvent.type(campoValor, '100');
    userEvent.click(botao);

    const novaTransacao = screen.getByTestId('lista-transacoes');
    const itemExtrato = screen.getByRole('listitem');

    expect(novaTransacao).toContainElement(itemExtrato);
  });

  test('Deve navegar até a pagina correspondente ao link clicado', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaCartoes = screen.getByText('Cartões');
    expect(linkPaginaCartoes).toBeInTheDocument();

    userEvent.click(linkPaginaCartoes);
    const tituloPaginaCartoes = await screen.findByText('Meus cartões');

    expect(tituloPaginaCartoes).toBeInTheDocument();
  });

  test('Deve Navegar para a página de investimento', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });
    const linkInvestimentos = screen.getByText('Investimentos');

    expect(linkInvestimentos).toBeInTheDocument();
    userEvent.click(linkInvestimentos);

    const tituloPaginaInvestimentos = await screen.findByText('Renda Fixa');
    expect(tituloPaginaInvestimentos).toBeInTheDocument();
  });
});
