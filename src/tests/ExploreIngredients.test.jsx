import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import { Explore } from '../pages';
import ExploreIngredients from '../pages/ExploreIngredients';

describe('1 - Test explore by ingredient page', () => {
  test('Test page', () => {
    const { history } = renderWithRouter(<Explore />);
    history.push('/comidas/ingredientes');
    renderWithRouter(<ExploreIngredients history={ history } />);
    const text = screen.getByText(/explorar ingredientes/i);
    expect(text).toBeIntTheDocument();
  });
});
