import React from 'react';
import userEvent from '@testing-library/user-event';
import { LocalStorageMock } from '@react-mock/localstorage';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const path = '/comidas/52977';

const localMock = {
  alcoholicOrNot: '',
  area: 'Turkish',
  category: 'Side',
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  type: 'comida',
};

const WHITE_HEART_ICON = 'whiteHeartIcon.svg';

const favoriteRecipes = [{ id: '52977', type: 'comida', area: '', alcoholicOrNot: '' }];

describe('Favorite Button', () => {
  describe('Display elements', () => {
    it('Should render a button with name "ícone de coração"', () => {
      const { history, getByRole } = renderWithRouter(<App />);
      history.push(path);
      const favoriteButton = getByRole('button', { name: /ícone de coração/i });
      expect(favoriteButton).toBeInTheDocument();
    });
  });

  it('Should render a button with a image inside the button', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push(path);
    const heartImage = getByRole('img', { name: /ícone de coração/i });
    expect(heartImage).toBeInTheDocument();
    expect(heartImage).toHaveAttribute('alt', 'Ícone de coração');
    expect(heartImage).toHaveAttribute('src', WHITE_HEART_ICON);
    expect(heartImage).toHaveAttribute('class', 'small-btn');
  });

  describe('Component behaviour', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should not have a favoriteRecipes key in localstorage', () => {
      const { history } = renderWithRouter(
        <LocalStorageMock item={ localMock }>
          <App />
        </LocalStorageMock>,
      );
      history.push(path);
      const favoriteRecipesKey = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteRecipesKey).toEqual(null);
    });

    it('Create favoriteRecipes key in localstorage by clicking the heart button', () => {
      const { history, getByRole } = renderWithRouter(
        <LocalStorageMock item={ localMock }>
          <App />
        </LocalStorageMock>,
      );
      history.push(path);
      const favoriteButton = getByRole('button', { name: /ícone de coração/i });
      userEvent.click(favoriteButton);
      // userEvent.click(favoriteButton);
      const favoriteRecipesKey = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteRecipesKey).toStrictEqual(favoriteRecipes);
    });

    it('Clicking in the heart 2 times with same recipe, should have empty array', () => {
      const { history, getByRole } = renderWithRouter(
        <LocalStorageMock item={ localMock }>
          <App />
        </LocalStorageMock>,
      );
      history.push(path);
      const favoriteButton = getByRole('button', { name: /ícone de coração/i });
      userEvent.click(favoriteButton);
      userEvent.click(favoriteButton);
      const favoriteRecipesKey = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteRecipesKey).toStrictEqual([]);
    });

    it('Should update the favoriteRecipe key bye add 2 or more items', () => {
      const { history, getByRole } = renderWithRouter(
        <LocalStorageMock item={ localMock }>
          <App />
        </LocalStorageMock>,
      );
      history.push(path);
      const favoriteButton = getByRole('button', { name: /ícone de coração/i });
      userEvent.click(favoriteButton);
      history.push('/comidas/52978');
      userEvent.click(favoriteButton);
      userEvent.click(favoriteButton);
      const favoriteRecipesKey = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteRecipesKey).toHaveLength(1);
    });

    it('Should render a black heart icon if the recipe is favorited', () => {
      const { history, getByRole } = renderWithRouter(<App />);
      history.push(path);
      const favoriteButton = getByRole('button', { name: /ícone de coração/i });
      const heartImage = getByRole('img', { name: /ícone de coração/i });
      expect(heartImage).toHaveAttribute('src', WHITE_HEART_ICON);
      userEvent.click(favoriteButton);
      expect(heartImage).toHaveAttribute('src', 'blackHeartIcon.svg');
      userEvent.click(favoriteButton);
      expect(heartImage).toHaveAttribute('src', WHITE_HEART_ICON);
    });
  });
});
