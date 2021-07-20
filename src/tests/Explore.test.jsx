import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Explore from '../pages/Explore';
import { ExploreMealsOrDrinks } from '../pages';

describe('1 - Test the Explore Page', () => {
  test('Test if exists Explore Meals button', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const btnExploreMeal = getByTestId('explore-food');
    expect(btnExploreMeal.textContent).toBe('Explorar Comidas');
  });

  test('Test if exists Explore Drinks button', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const btnExploreDrink = getByTestId('explore-drinks');
    expect(btnExploreDrink.textContent).toBe('Explorar Bebidas');
  });
});

describe('2 - Test Explore Meals page', () => {
  test('Redirect to Explore Meals', () => {
    const { history, getByTestId } = renderWithRouter(<Explore />);
    const btnExploreMeal = getByTestId('explore-food');
    fireEvent.click(btnExploreMeal);
    expect(history.location.pathname).toBe('/explorar/comidas');
  });

  test('Test Explore by Ingredients button', () => {
    const { history } = renderWithRouter(<Explore />);
    const { getByTestId } = renderWithRouter(
      <ExploreMealsOrDrinks
        history={ history }
      />,
    );
    history.push('/ingredientes');
    const btnExploreIngredient = getByTestId('explore-by-ingredient');
    expect(btnExploreIngredient.textContent).toBe('Por Ingredientes');
  });
});

describe('3 - Test Explore Drinks page', () => {
  test('Redirect to Explore Drinks', () => {
    const { history, getByTestId } = renderWithRouter(<Explore />);
    const btnExploreDrink = getByTestId('explore-drinks');
    fireEvent.click(btnExploreDrink);
    expect(history.location.pathname).toBe('/explorar/bebidas');
  });

  test('Test Explore by Ingredients button', () => {
    const { history } = renderWithRouter(<Explore />);
    const { getByTestId } = renderWithRouter(
      <ExploreMealsOrDrinks
        history={ history }
      />,
    );
    const btnExploreIngredient = getByTestId('explore-by-ingredient');
    expect(btnExploreIngredient.textContent).toBe('Por Ingredientes');
  });
});
