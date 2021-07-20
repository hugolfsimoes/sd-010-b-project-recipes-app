import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    function getEmail() {
      setEmail(localStorage.getItem('user', 'value'));
    }
    getEmail();
  }, []);

  function handeClickLogOut() {
    localStorage.clear();
    history.push('/');
  }
  /*
  const email = localStorage.getItem('user', 'value').split('"')[3]; */
  return (
    <div className="profile-app">
      <Header title="Perfil" display="false" />
      {email
      && (
        <p data-testid="profile-email">
          {email.split('"')[3]}
        </p>)}
      <div className="profile">
        <Button
          type="Button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </Button>
        <Button
          type="Button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </Button>
        <Button
          type="Button"
          data-testid="profile-logout-btn"
          onClick={ handeClickLogOut }
        >
          Sair
        </Button>
      </div>
      <Footer />
    </div>
  );
}
