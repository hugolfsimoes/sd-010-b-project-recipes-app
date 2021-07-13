import React from 'react';
import userEvent from '@testing-library/user-event';
import { LocalStorageMock } from '@react-mock/localstorage';
import renderWithRouter from './renderWithRouter';
import { Login } from '../pages';

const VALID_EMAIL = 'accecpt@accept.com';
const VALID_PASSWORD = '1234567';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

const TOKEN_INITIAL_VALUE = 1;

const localMock = {
  user: VALID_EMAIL,
  mealsToken: TOKEN_INITIAL_VALUE,
  cocktailsToken: TOKEN_INITIAL_VALUE,
  doneRecipes: [],
  inProgressRecipe: [],
};

describe('1 - Testing the login page from Recipes App', () => {
  it('login location.pathname should be "/"', () => {
    const { history } = renderWithRouter(<Login />);
    expect(history.location.pathname).toBe('/');
  });

  it('login and password, labels', () => {
    const { getByLabelText } = renderWithRouter(<Login />);
    const emailLabel = getByLabelText(/email/i);
    expect(emailLabel).toBeInTheDocument();
    const passwordLabel = getByLabelText(/password/i);
    expect(passwordLabel).toBeInTheDocument();
  });

  it('email and password inputs', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
  });

  it('loggin button disabled when load the login page and with text "logar" ', () => {
    const { getByRole } = renderWithRouter(<Login />);
    const logginBtn = getByRole('button', { name: /logar/i });
    expect(logginBtn).toBeInTheDocument();
    expect(logginBtn).toBeDisabled();
  });
});

describe('2 - testing the loggin button usability when type emails and passwords', () => {
  it('button disabled when type a invalid email', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const logginBtn = getByRole('button', { name: /logar/i });

    userEvent.type(emailInput, 'email@email');
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, 'email@');
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, 'email.com');
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, 'email');
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(logginBtn).toBeDisabled();
  });

  it('button disabled when type a invalid password', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const logginBtn = getByRole('button', { name: /logar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '1');
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '12');
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '123');
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '1234');
    expect(logginBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, '12345');
    expect(logginBtn).toBeDisabled();
  });
});

describe('3 - button loggin be able when valid email and password are inserted', () => {
  it('button should be able', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const logginBtn = getByRole('button', { name: /logar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(logginBtn).toBeEnabled();
  });
});

describe('4 - Some changes after clickin login button', () => {
  it('Must have a "user" key with valid email', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <LocalStorageMock item={ localMock }>
        <Login />
      </LocalStorageMock>,
    );
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const logginBtn = getByRole('button', { name: /logar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(logginBtn);

    const emailUser = JSON.parse(localStorage.getItem('user'));
    expect(emailUser).toEqual({ email: VALID_EMAIL });
  });

  it('"mealsToken" and "cocktailsToken" key with initial value equals 1', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <LocalStorageMock item={ localMock }>
        <Login />
      </LocalStorageMock>,
    );
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const logginBtn = getByRole('button', { name: /logar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(logginBtn);

    const mealToken = JSON.parse(localStorage.getItem('mealsToken'));
    const drinkToken = JSON.parse(localStorage.getItem('cocktailsToken'));
    expect(mealToken).toEqual(TOKEN_INITIAL_VALUE);
    expect(drinkToken).toEqual(TOKEN_INITIAL_VALUE);
  });

  it('"doneRecipe" and "inProgressRecipes" key with initial value equals []', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <LocalStorageMock item={ localMock }>
        <Login />
      </LocalStorageMock>,
    );
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const logginBtn = getByRole('button', { name: /logar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(logginBtn);

    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(doneRecipe).toStrictEqual([]);
    expect(inProgressRecipes).toStrictEqual([]);
  });

  it('Path name must be "comidas"', () => {
    const { getByRole, getByTestId, history } = renderWithRouter(<Login />);
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const logginBtn = getByRole('button', { name: /logar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(logginBtn);

    expect(history.location.pathname).toBe('/comidas');
  });
});
