import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import Explore from '../pages/Explore';
import { ExploreMealsOrDrinks } from '../pages';
// import App from '../App';

describe('1 - Test Explore by Meals page', () => {
  test('Test Explore by Ingredients button', () => {
    const { history } = renderWithRouter(<Explore />);
    renderWithRouter(
      <ExploreMealsOrDrinks
        history={ history }
      />,
    );
    const byIngred = screen.getByText(/por ingredientes/i);
    expect(byIngred).toBeInTheDocument();
  });

  test('Test Surprise button', () => {
    const { history } = renderWithRouter(<Explore />);
    history.push('/comidas');
    renderWithRouter(
      <ExploreMealsOrDrinks
        history={ history }
      />,
    );
    const byArea = screen.getByText(/me surpreenda/i);
    expect(byArea).toBeInTheDocument();
  });
});
