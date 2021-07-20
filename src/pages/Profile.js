import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends React.Component {
  constructor() {
    super();
    this.onClickLogOut = this.onClickLogOut.bind(this);
  }

  onClickLogOut() {
    const { history } = this.props;
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  }

  renderEmail() {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail) return userEmail.email;
    return null;
  }

  render() {
    return (
      <section>
        <Header title="Perfil" />
        <p
          className="profile-email"
          data-testid="profile-email"
        >
          { this.renderEmail() }
        </p>
        <hr />
        <div className="container-btn-profile">
          <div className="btn-profile">
            <Link to="/receitas-feitas">
              <button
                className="btn-done"
                data-testid="profile-done-btn"
                type="button"
              >
                Receitas Feitas
              </button>
            </Link>
          </div>
          <div className="btn-profile">
            <Link to="/receitas-favoritas">
              <button
                className="btn-favorite"
                data-testid="profile-favorite-btn"
                type="button"
              >
                Receitas Favoritas
              </button>
            </Link>
          </div>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ this.onClickLogOut }
            className="button-login"
          >
            Sair
          </button>
        </div>
        <Footer />
      </section>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
