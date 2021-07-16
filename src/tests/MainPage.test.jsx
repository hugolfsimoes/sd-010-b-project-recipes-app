import { cleanup, screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('1 - The route of MainPage', () => {
  it('Route must be "/comidas"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');
  });
});

describe('2 - Must be a header with profile and search icons, and page-title', () => {
  it('Header shows the profile and search icons', () => {
    const { history, getByRole, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');
    const profileIcon = getByRole('img', { name: /user frame/i });
    expect(profileIcon).toBeInTheDocument();

    const searchIcon = getByRole('img', { name: /search icon/i });
    expect(searchIcon).toBeInTheDocument();

    const headerText = getByTestId('page-title');
    expect(headerText).toBeInTheDocument();
  });
});

describe('3 -The search button have to enable and search elements have appears', () => {
  it('There is a search icon on page', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push('/comidas');
    const searchIcon = getByRole('button', { name: /search icon/i });
    expect(searchIcon).toBeInTheDocument();
  });

  it('There are search element fields after clicking search icon button', () => {
    const { history, getByRole, getByLabelText } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchBtnIcon = getByRole('button', { name: /search icon/i });
    expect(searchBtnIcon).toBeInTheDocument();
    userEvent.click(searchBtnIcon);

    expect(getByLabelText(/ingrediente/i)).toBeInTheDocument();
    expect(getByLabelText(/nome/i)).toBeInTheDocument();
    expect(getByLabelText(/primeira letra/i)).toBeInTheDocument();

    expect(getByRole('radio', { name: /ingrediente/i })).toBeInTheDocument();
    expect(getByRole('radio', { name: /nome/i })).toBeInTheDocument();
    expect(getByRole('radio', { name: /primeira letra/i })).toBeInTheDocument();
  });
});

describe('4 - MainPage quantity of recipe cards', () => {
  it('Must show 12 recipe cards', async () => {
    const { history, getByTestId } = await renderWithRouter(<App />);
    history.push('/comidas');

    const recipeCards = await waitForElement(() => getByTestId('card-section'));
    expect(recipeCards).toBeInTheDocument();
  });
});

describe('5 - Must render a footer with some options', () => {
  it('Rendering the footer', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');

    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Footer must have three buttons wih src', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/52977');

    screen.debug();
  });
});
