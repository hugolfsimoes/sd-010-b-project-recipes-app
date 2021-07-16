import React from 'react';
// import PropTypes from 'prop-types';
import './DetailsPage.css';
import { Link } from 'react-router-dom';
// import 'App.css'

function BtnStartFoodRecipe(id) {
  const recipeIndex = Object.values(id);
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const receitaIniciada = [];
  // const finishedRecipes = JSON.parse(localStorage.getItem('finishedRecipes'));
  // const receitaFinalizada = [];

  const startRecipe = () => {
    // receitaIniciada.push(recipeIndex[0]);
    const idRecipe = recipeIndex[0];
    localStorage
      .setItem('inProgressRecipes',
        JSON.stringify({
          ...inProgressRecipes,
          cocktails: {
            ...inProgressRecipes.cocktails,
            [idRecipe]: [],
          },
        }));
  };
  // JSON.stringify([...inProgressRecipes, ...receitaIniciada]));

  // const finishRecipe = () => {
  //   receitaFinalizada.push(id);
  //   localStorage
  //     .setItem('finishedRecipes',
  //       JSON.stringify([...finishedRecipes, ...receitaFinalizada]));
  // };
  // const btnText = 'Iniciar Receita';
  const verifyLocalStorage = () => {
    if (inProgressRecipes) {
      if (Object.keys(inProgressRecipes.cocktails).includes(recipeIndex[0])) {
        return 'Continuar Receita';
      }
      return 'Iniciar Receita';
    }
  };

  return (
    <div>
      <Link to={ `/comidas/${recipeIndex[0]}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="button"
          onClick={ startRecipe }
        >
          {verifyLocalStorage()}
        </button>
      </Link>
    </div>
  );
}

BtnStartFoodRecipe.propTypes = {
  // id: PropTypes.string.isRequired,
};

export default BtnStartFoodRecipe;
