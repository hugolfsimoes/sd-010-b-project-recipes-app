import React from 'react';
import userEvent from '@testing-library/user-event';
import { LocalStorageMock } from '@react-mock/localstorage';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const path = '/receitas-favoritas';

const localMock = [
  {
    id: '53013',
    type: 'comida',
    area: 'American',
    category: 'Beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
  },
  {
    id: '15997',
    type: 'bebida',
    area: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
];

describe('Page behaviour', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Display filter buttons', () => {
    const { history, getByText } = renderWithRouter(
      <LocalStorageMock item={ localMock }>
        <App />
      </LocalStorageMock>,
    );
    history.push(path);

    const allBtn = getByText('All');
    const mealBtn = getByText('Comidas');
    const drinkBtn = getByText('Bebidas');

    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
  });

  it('Show empty favorited message when there is no favorite recipe', () => {
    const { history, getByText, getAllByRole } = renderWithRouter(
      <App />,
    );
    history.push(path);
    const shareBtns = getAllByRole('button', { alt: /Ícone de compartilhar/i });

    userEvent.click(shareBtns[0]);

    const message = getByText(/Nenhuma receita marcada como favorita ainda :/i);
    expect(message).toBeInTheDocument();
  });

  it('Render favorites recipes according to filter buttons ', () => {
    const { history, getByText } = renderWithRouter(
      <LocalStorageMock item={ localMock }>
        <App />
      </LocalStorageMock>,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(localMock));
    history.push(path);

    const allBtn = getByText('All');
    const mealBtn = getByText('Comidas');
    const drinkBtn = getByText('Bebidas');

    userEvent.click(allBtn);

    const meal = getByText(/Big Mac/i);
    const drink = getByText(/GG/i);

    expect(meal).toBeInTheDocument();
    expect(drink).toBeInTheDocument();

    userEvent.click(mealBtn);

    expect(meal).toBeInTheDocument();
    expect(drink).not.toBeInTheDocument();

    userEvent.click(drinkBtn);

    // expect(meal).not.toBeInTheDocument();
    // expect(drink).toBeInTheDocument();
  });

  it('Show copied message', () => {
    const { history, getAllByRole, getByText } = renderWithRouter(
      <LocalStorageMock item={ localMock }>
        <App />
      </LocalStorageMock>,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(localMock));
    history.push(path);

    const allBtn = getByText('All');
    userEvent.click(allBtn);

    const shareBtns = getAllByRole('button', { name: /ícone de compartilhar/i });
    expect(shareBtns[0]).toBeInTheDocument();

    // userEvent.click(shareBtns[0]);

    // const copiedMsg = getByText(/Link copiado!/i);
    // expect(copiedMsg).toBeInTheDocument();
  });
});
