import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import MealsContextProvider from '../context/mealsContext';
import DrinksContextProvider from '../context/drinksContext';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <MealsContextProvider>
          <DrinksContextProvider>
            {component}
          </DrinksContextProvider>
        </MealsContextProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouter;