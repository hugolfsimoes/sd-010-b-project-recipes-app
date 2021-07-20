import React from 'react';
import Provider from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderWithRouter from './renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

const mockStore = configureMockStore();
const store = mockStore({});

describe('1 - Test done recipe app', () => {
  test('Test Food button', () => {
    const { getByTestId } = renderWithRouter(
      <Provider store={ store }>
        <DoneRecipes store={ store } />
      </Provider>,
    );
    const btnFoodFilter = getByTestId('filter-by-food-btn');
    expect(btnFoodFilter).toBeInTheDocument();
  });
});
