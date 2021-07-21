import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context';
import { handleDoneRecipes } from '../helpers/handleStorageKeys';
import useRecipeParams from '../utils/useRecipeParams';

function ButtonFinishRecipe() {
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };

  const { push } = useHistory();
  const [recipeParams] = useRecipeParams();
  const { isDisable } = useContext(RecipeContext);
  return (
    <button
      type="button"
      style={ bottomFixed }
      data-testid="finish-recipe-btn"
      disabled={ isDisable }
      onClick={ () => {
        handleDoneRecipes({ ...recipeParams });
        push('/receitas-feitas');
      } }
    >
      Finalizar Receita
    </button>
  );
}

export default ButtonFinishRecipe;
