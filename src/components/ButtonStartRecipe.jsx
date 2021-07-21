import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { handleIsStored, handleRecipeInProgress } from '../helpers/handleStorageKeys';
import useRecipeParams from '../utils/useRecipeParams';

function ButtonStartRecipe() {
  const bottomFixed = {
    position: 'fixed',
    bottom: '0px',
  };

  const { push } = useHistory();
  const { pathname } = useLocation();
  const [recipeParams] = useRecipeParams();
  const { id, key } = recipeParams;
  const isInProgress = handleIsStored({ id, storageKey: 'inProgressRecipes', key });
  return (
    <button
      type="button"
      style={ bottomFixed }
      data-testid="start-recipe-btn"
      onClick={ () => {
        if (!isInProgress) handleRecipeInProgress({ id, key });
        push(`${pathname}/in-progress`);
      } }
    >
      {`${isInProgress ? 'Continuar' : 'Iniciar'} Receita`}
    </button>
  );
}

export default ButtonStartRecipe;
