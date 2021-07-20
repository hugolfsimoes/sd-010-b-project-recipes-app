import React from 'react';
// import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import Explore from '../pages/Explore';
import { ExploreArea } from '../pages';

describe('1 - Test explore by area page', () => {
  test('Test select', () => {
    const { history } = renderWithRouter(<Explore />);
    history.push('/comidas/area');
    renderWithRouter(
      <ExploreArea
        history={ history }
      />,
    );
    const byArea = screen.getByRole('combobox');
    expect(byArea).toBeInTheDocument();
  });

  test('All option', () => {
    const { history } = renderWithRouter(<Explore />);
    history.push('/comidas/area');
    renderWithRouter(
      <ExploreArea
        history={ history }
      />,
    );
    const byArea = screen.getByTestId('All-option');
    expect(byArea).toBeInTheDocument();
  });
});
