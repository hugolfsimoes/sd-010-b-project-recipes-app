import React from 'react';
// import PropTypes from 'prop-types';
import './DetailsPage.css';
import { Link } from 'react-router-dom';
// import 'App.css'

function BtnStartDrinkRecipe(drinks, ingredients) {
  const { id } = drinks.drinks;
  console.log(id, 'BTN');
  // const { id } = params;
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const startRecipe = () => {
    localStorage
      .setItem('inProgressRecipes',
        JSON.stringify({
          ...inProgressRecipes,
          cocktails: {
            ...inProgressRecipes.cocktails,
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
      if (Object.keys(inProgressRecipes.cocktails).includes(id)) {
        return 'Continuar Receita';
      }
      return 'Iniciar Receita';
    }
  };

  return (
    <div>
      <Link to={ `/bebidas/${id}/in-progress` }>
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

// BtnStartDrinkRecipe.propTypes = {
//   id: PropTypes.string.isRequired,
//   ingredients: PropTypes.arrayOf.isRequired,
// };

export default BtnStartDrinkRecipe;
