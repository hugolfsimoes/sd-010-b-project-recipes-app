import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';
import SBElements from './SBElements';
import ContextRecipes from '../context/contextRecipes';
import './FoodAndDrinkPage.css';

function Profile({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);

  // https://blog.logrocket.com/localstorage-javascript-complete-guide/
  const userEmail = JSON.parse(localStorage.getItem('user'))
    || { email: 'exemplo@email.com' };
  const { email } = userEmail;

  const goFavorite = () => history.push('/receitas-favoritas');

  const goDone = () => history.push('/receitas-feitas');

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    setTitle('Perfil');
  }, [setTitle]);

  return (
    <div>
      <Header history={ history } data-testid="page-title" />
      { goSearch && <SBElements history={ history } /> }
      <h2
        data-testid="profile-email"
        className="user-email"
      >
        {email}
      </h2>
      <div className="profile-buttons-container">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ goDone }
          className="category-buttons"
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ goFavorite }
          className="category-buttons"
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
          className="category-buttons"
        >
          Sair
        </button>
      </div>
      <Footer history={ history } />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default Profile;
