import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareBtn from './ShareBtn';

const handleToggleFavorite = (fav, setFav, favoriteRecipes, recipe) => {
  const id = recipe.idMeal || recipe.idDrink;
  if (fav) {
    const item = favoriteRecipes.filter((elem) => elem.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(item));
  } else {
    const favRecipe = {
      id,
      type: recipe.idMeal ? 'comida' : 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    localStorage
      .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, favRecipe]));
  }
  setFav(!fav);
};

export default function HeaderDetails({ recipe, pathname }) {
  const [fav, setFav] = useState(false);
  const {
    strMeal, strDrink, strMealThumb, strDrinkThumb,
    strCategory, strInstructions, strAlcoholic, idMeal, idDrink,
  } = recipe;

  const id = idMeal || idDrink;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let verify = false;
  if (!favoriteRecipes) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  } else {
    verify = favoriteRecipes.some((rec) => rec.id === id);
  }

  useEffect(() => {
    setFav(verify);
  }, [verify]);

  return (
    <>
      <header>
        <div className="header-details">
          <h4 data-testid="recipe-title">{strMeal || strDrink}</h4>
          <ShareBtn pathname={ pathname } recipe={ recipe } />
          <button
            type="button"
            onClick={ () => handleToggleFavorite(fav,
              setFav, favoriteRecipes, recipe) }
          >
            <img
              data-testid="favorite-btn"
              src={ fav ? blackHeartIcon : whiteHeartIcon }
              alt="favorite"
            />
          </button>
        </div>
        <img
          className="img-detail"
          src={ strMealThumb || strDrinkThumb }
          alt="avatar"
          data-testid="recipe-photo"
        />
      </header>
      <p data-testid="recipe-category">{strMeal ? strCategory : strAlcoholic}</p>
      <p data-testid="instructions">{strInstructions}</p>
    </>
  );
}

HeaderDetails.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,

  pathname: PropTypes.string.isRequired,
};
