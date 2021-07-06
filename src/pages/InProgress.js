import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import UserContext from '../context/user.context';
import RecipeInProgress from '../components/RecipeInProgress';

function InProgress() {
  const { inProgress } = useContext(UserContext);
  let [ingredients, setIngredients] = useState([]);
  const { location: { pathname }, push } = useHistory();
  const { id } = useParams();

  const isDrinks = pathname.includes('bebidas');
  const typeKey = isDrinks ? 'cocktails' : 'meals';
  let usedIngredients = inProgress[typeKey][id];

  // Cypress bug
  if (!ingredients) ingredients = [];
  if (!usedIngredients) usedIngredients = [];

  const isFinished = ingredients.length === usedIngredients.length;

  function handleClick() {
    push('/receitas-feitas');
  }

  function renderFinishButton() {
    return (
      <button
        type="button"
        className="button-recipe"
        onClick={ handleClick }
        disabled={ !isFinished }
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    );
  }

  return (
    <main>
      <RecipeInProgress ingredients={ ingredients } setIngredients={ setIngredients } />
      {renderFinishButton()}
    </main>
  );
}

export default InProgress;
