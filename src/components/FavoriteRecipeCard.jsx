import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import black from '../images/blackHeartIcon.svg';

class FavoriteRecipesCard extends Component {
  constructor() {
    super();

    this.state = {
      copied: false,
    };

    this.copyLink = this.copyLink.bind(this);
    this.removeFavoriteRecipe = this.removeFavoriteRecipe.bind(this);
  }

  copyLink() {
    this.setState({ copied: true });

    const { recipe } = this.props;
    const { type, id } = recipe;
    copy(`http://localhost:3000/${type}s/${id}`);
  }

  removeFavoriteRecipe(id) {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      const newFavorites = favorites.filter((item, index) => index !== id);
      localStorage.favoriteRecipes = JSON.stringify(newFavorites);
      return newFavorites;
    }
  }

  render() {
    const { recipe, index } = this.props;
    const { name, area, category, image, alcoholicOrNot } = recipe;
    const { copied } = this.state;
    return (
      <section>
        <div>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
            width="100px"
          />
        </div>
        <div>
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            {`${area} - ${category}`}
          </h5>
          <h5 data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</h5>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          <button type="button" onClick={ this.copyLink }>
            {copied ? 'Link copiado!'
              : (
                <img
                  src={ shareIcon }
                  alt="shareIcon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />)}
          </button>
          <button
            type="button"
            onClick={ () => this.removeFavoriteRecipe(index) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ black }
              alt="favoriteIcon"
            />
          </button>
        </div>
      </section>
    );
  }
}

FavoriteRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
  index: PropTypes.string,
}.isRequired;

export default FavoriteRecipesCard;
