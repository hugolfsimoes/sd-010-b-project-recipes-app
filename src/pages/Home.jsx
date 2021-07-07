import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';

function Home() {
  const { setLogin, login } = useContext(RecipesContext);
  const [checkLogin, setCheckLogin] = useState({
    email: '',
    password: '',
    checkEmail: false,
    checkPassword: false,
  });

  const emailValidation = () => {
    const { email } = checkLogin;
    const checkEmail = (/[\w.]+@\w+\.\w{2,4}/).test(email);
    setCheckLogin({ ...checkLogin, checkEmail });
  };

  const passwordValidation = () => {
    const { password } = checkLogin;
    const SIX = 6;

    setCheckLogin({ ...checkLogin, checkPassword: password.length > SIX });
  };

  useEffect(() => {
    passwordValidation();
  }, [checkLogin.password]);

  useEffect(() => {
    emailValidation();
  }, [checkLogin.email]);

  const handleChange = ({ target: { name, value } }) => {
    setCheckLogin({ ...checkLogin, [name]: value });
  };

  const handleClick = () => {
    setLogin([...login, checkLogin.email]);
    const userLocalStorage = {
      email: checkLogin.email,
    };

    localStorage.setItem('user', JSON.stringify(userLocalStorage));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  };
  const { checkPassword, checkEmail } = checkLogin;
  return (
    <main>
      <label htmlFor="input-Email">
        <input
          types="text"
          placeholder="Email"
          id="input-Email"
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="input-Password">
        <input
          type="password"
          placeholder="Password"
          id="input-Password"
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
        />
      </label>
      <Link to="/comidas">
        <button
          type="button"
          disabled={ !(checkPassword && checkEmail) }
          onClick={ handleClick }
          data-testid="login-submit-btn"

        >
          Entrar
        </button>
      </Link>
    </main>
  );
}

export default Home;