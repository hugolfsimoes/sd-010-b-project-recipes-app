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
    expect(heartImage).toHaveAttribute('src', 'whiteHeartIcon.svg');
    expect(heartImage).toHaveAttribute('class', 'small-btn');
  });

  describe('Component behaviour', () => {
    it('Should not have a favoriteRecipes key in localstorage', () => {
      const { history } = renderWithRouter(
        <LocalStorageMock item={ localMock }>
          <App />
        </LocalStorageMock>,
      );
      history.push(path);
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteRecipes).toEqual(null);
    });

    it('Create favoriteRecipes key in localstorage by clicking the heart button', () => {
      const { history, getByRole } = renderWithRouter(
        <LocalStorageMock item={ localMock }>
          <App />
        </LocalStorageMock>,
      );
      history.push(path);
      const heartImage = getByRole('img', { name: /ícone de coração/i });
      userEvent.click(heartImage);
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(favoriteRecipes).toStrictEqual(localMock);
    });
  });
});
