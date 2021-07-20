import React from 'react';
import PropTypes from 'prop-types';
import './DetailsPage.css';
import { Link } from 'react-router-dom';
// import 'App.css'

function BtnStartFoodRecipe({ id, ingredients }) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const startRecipe = () => {
    localStorage
      .setItem('inProgressRecipes',
        JSON.stringify({
          ...inProgressRecipes,
          meals: {
            ...inProgressRecipes.meals,
            [id]: ingredients,
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
      if (Object.keys(inProgressRecipes.meals).includes(id)) {
        return 'Continuar Receita';
      }
      return 'Iniciar Receita';
    }
  };

  return (
    <div>
      <Link to={ `/comidas/${id}/in-progress` }>
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
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf.isRequired,
};

export default BtnStartFoodRecipe;
