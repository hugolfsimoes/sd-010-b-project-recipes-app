import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteFoodBtn({ recipe }) {
  console.log(recipe, 'RECIPEEEEEEEEEEEEEEEEEEEEEE');
  const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe;

  const favoritedRecipes = JSON
    .parse(localStorage.getItem('favoriteRecipes')) || [];

  const handleUnfavorite = () => {
    const filteredRecipes = favoritedRecipes.filter((fav) => fav.strMeal);
    console.log(filteredRecipes, 'FILTEEEER');
    if (filteredRecipes === strMeal) {
      localStorage.removeItem('favoriteRecipes', favoritedRecipes.includes(idMeal));
    }
  };

  const handleFavorite = () => {
    if (favoritedRecipes.includes(idMeal)) {
      handleUnfavorite();
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...favoritedRecipes,
          {
            id: idMeal,
            type: recipe.strMeal ? 'Comidas' : 'Bebidas',
            area: strArea,
            category: strCategory,
            alcoholicOrNot: '',
            name: strMeal,
            image: strMealThumb,
          }],
      ));
    }
  };

  const verificaLocalStorage = () => {
    if (favoritedRecipes.includes(idMeal)) {
      return (
        <div>
          <input
            type="image"
            src={ blackHeartIcon }
            alt="Unfavorite this recipe button"
            width="30"
            onClick={ handleUnfavorite }
          />
        </div>
      );
    }
    return (
      <div>
        <input
          type="image"
          src={ whiteHeartIcon }
          alt="Favorite this recipe button"
          width="30"
          onClick={ handleFavorite }
        />
      </div>
    );
  };
  return (
    <div>
      {verificaLocalStorage()}
    </div>
  );
}

export default FavoriteFoodBtn;
