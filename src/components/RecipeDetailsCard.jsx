import React, { useContext, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { handleFavorite } from '../helpers/handleStorageKeys';
import RecipeContext from '../context';
import useRecipeParams from '../utils/useRecipeParams';

function RecipeDetailsCard() {
  const [recipeParams] = useRecipeParams();
  const { name, image, strCategory, strAlcoholic } = recipeParams;
  const { pathMeal, isFavorite, setIsFavorite } = useContext(RecipeContext);
  // const { idDrink, idMeal, strCategory, strMeal, strDrink,
  //   strMealThumb, strDrinkThumb, strAlcoholic, strArea } = recipes[0];

  const [isCopy, setIsCopy] = useState(false);
  // const commonInfo = {
  //   area: strArea,
  //   category: strCategory,
  //   alcoholicOrNot: strAlcoholic,
  // };

  // const recipe = pathMeal
  //   ? { ...commonInfo, id: idMeal, type: 'comida', name: strMeal, image: strMealThumb }
  //   : { ...commonInfo,
  //     id: idDrink,
  //     type: 'bebida',
  //     name: strDrink,
  //     image: strDrinkThumb,
  //   };

  // const { id, name, image } = recipe;

  // useEffect(() => {
  //   setIsFavorite(handleIsStored({ id, storageKey: 'favoriteRecipes' }));
  // }, []);

  // function handleShare() {
  //   clipboardCopy(window.location.href);
  //   setIsCopy(true);
  // }

  function handleShare() {
    const url = window.location.href
      .split('/')
      .filter((baseUrl) => baseUrl !== 'in-progress')
      .join('/');
    clipboardCopy(url);
    setIsCopy(true);
  }

  return (
    <div>
      <h2 data-testid="recipe-title">{ name }</h2>
      <img src={ image } alt={ name } data-testid="recipe-photo" />
      <button type="button" onClick={ () => handleShare() }>
        <img src={ shareIcon } alt="share icon" data-testid="share-btn" />
      </button>
      {isCopy && (<p>Link copiado!</p>)}
      <button
        type="button"
        onClick={ () => {
          handleFavorite({ isFavorite, ...recipeParams });
          setIsFavorite(!isFavorite);
        } }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="heart icon"
          data-testid="favorite-btn"
        />
      </button>
      <p data-testid="recipe-category">{ pathMeal ? strCategory : strAlcoholic }</p>
    </div>
  );
}

export default RecipeDetailsCard;
