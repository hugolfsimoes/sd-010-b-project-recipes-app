import userEvent from '@testing-library/user-event';
import React from 'react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderPath from './renderWithRouter';

describe('1 - The route of MainPage', () => {
  it('Route must be "/comidas"', () => {
    const { history } = renderPath(<App />);
    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');
  });
});

describe('2 - Must be a header with profile and search icons, and page-title', () => {
  it('Header shows the profile and search icons', () => {
    const { history, getByRole, getByTestId } = renderPath(<App />);
    history.push('/comidas');
    const profileIcon = getByRole('img', { name: /user frame/i });
    expect(profileIcon).toBeInTheDocument();

    const searchIcon = getByRole('img', { name: /search icon/i });
    expect(searchIcon).toBeInTheDocument();

    const headerText = getByTestId('page-title');
    expect(headerText).toBeInTheDocument();
  });
});

describe('3 -The search button have to enable and search elements', () => {
  it('There is a search icon on page', () => {
    const { history, getByRole } = renderPath(<App />);
    history.push('/comidas');
    const searchIcon = getByRole('button', { name: /search icon/i });
    expect(searchIcon).toBeInTheDocument();
  });

  it('There is search element fields after clicking search icon button', () => {
    const { history, getByRole, getByLabelText } = renderPath(<App />);
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
