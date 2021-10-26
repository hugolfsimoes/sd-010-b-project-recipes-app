import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from 'react-bootstrap/Button';

function Login() {
  const [isDisable, setisDisable] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  // https://github.com/tryber/sd-010-b-project-trybewallet/pull/24
  useEffect(() => {
    const minimalPasswordLength = 6;

    // Verificação de email conseguido através do site do Stackoverflow no link https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const emailValidationRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    // Conseguido a resolução do emailValidationRegex.test atrasvés do site do w3schools
    if (emailValidationRegex.test(email) && password.length > minimalPasswordLength) {
      setisDisable(false);
    } else {
      setisDisable(true);
    }
  }, [email, password]);

  function onclick() {
    // console.log(email);
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({
      email,
    }));
    history.push('/comidas');
  }

  return (
    <div className="app-login">

      <div className="login-content">
        <div className="input-group mb-3">

          <input
            className="form-control"
            type="email"
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="email-input"
            placeholder="Enter your email"
          />
        </div>
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="password"
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="password-input"
            placeholder="Enter your password"
          />
        </div>

        <Button
          type="button"
          onClick={ onclick }
          disabled={ isDisable }
          data-testid="login-submit-btn"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}

export default Login;
