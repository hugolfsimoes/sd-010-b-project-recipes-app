import React from 'react';
import PropTypes from 'prop-types';
import './DetailsPage.css';
// import 'App.css'

function BtnIniciarComida({ id }, { history }) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const receitaIniciada = [];
  // const finishedRecipes = JSON.parse(localStorage.getItem('finishedRecipes'));
  // const receitaFinalizada = [];

  const startRecipe = () => {
    receitaIniciada.push(id);
    localStorage
      .setItem('inProgressRecipes',
        JSON.stringify([...inProgressRecipes, ...receitaIniciada]));
    history.push(`comidas/${id}/in-progress`);
  };

  // const finishRecipe = () => {
  //   receitaFinalizada.push(id);
  //   localStorage
  //     .setItem('finishedRecipes',
  //       JSON.stringify([...finishedRecipes, ...receitaFinalizada]));
  // };

  let btnText = 'Iniciar receita';
  const verifyLocalStorage = () => {
    if (inProgressRecipes.includes(id)) {
      btnText = 'Continuar receita';
    }
  };

  verifyLocalStorage();

  return (
    <div>
      <button
        type="button"
        id="recipe-btn"
        className="btn-iniciar-receita"
        data-testid="start-recipe-btn"
        onClick={ startRecipe }
      >
        { btnText }
      </button>
      ;
    </div>
  );
}

BtnIniciarComida.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default BtnIniciarComida;
