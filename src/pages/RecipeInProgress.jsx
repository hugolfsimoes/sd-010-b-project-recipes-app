import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDrinkDetails, getMealDetails } from '../services';
import { FavoriteBtn, ShareBtn } from '../components';
import { finishedRecipe } from '../actions';
import {
  checkLocalStorage,
  updateLocalStorage,
  saveDoneRecipes,
} from '../services/localStorageManager';
import './css/inProgress.css';

function RecipeInProgress({ match, history, savesFinished }) {
  const { id } = match.params;
  const { pathname } = history.location;
  const recipeType = pathname.includes('/comidas') ? 'meals' : 'cocktails';
  const [recipeInProgress, setRecipeInProgress] = useState({});
  const [wasCopied, setWasCopied] = useState(false);
  const [isBtnDisable, setIsBtnDisable] = useState(true);

  const {
    strMeal,
    strMealThumb,
    strDrink,
    strDrinkThumb,
    strCategory,
    strInstructions,
  } = recipeInProgress;

  const strIngredient = Object.entries(recipeInProgress).filter(
    (el) => el[0].includes('strIngredient'),
  );
  const ingredients = strIngredient.filter((el) => el[1] !== '' && el[1] !== null);

  useEffect(() => {
    const getRecipes = async () => {
      const resp = recipeType === 'meals'
        ? await getMealDetails(id)
        : await getDrinkDetails(id);
      setRecipeInProgress(resp[0]);
    };
    getRecipes();
  }, [id, pathname, recipeType]);

  // const strMeasure = Object.entries(recipeInProgress).filter(
  //   (el) => el[0].includes('strMeasure'),
  // );
  // const measures = strMeasure.filter((el) => el[1] !== '' && el[1] !== null);

  return (
    <section id="inProgress">
      <section id="header-inProgress">
        <h2 data-testid="recipe-title">{strMeal || strDrink}</h2>
        <img
          src={ strMealThumb || strDrinkThumb }
          alt="Imagem ilustrativa do prato "
          data-testid="recipe-photo"
        />
        <section>
          <ShareBtn
            showCopiedMsg={ setWasCopied }
            testId="share-btn"
            id={ id }
            type={ recipeType === 'meals' ? 'comidas' : 'bebidas' }
            route={ `${recipeType === 'meals' ? 'comidas' : 'bebidas'}/${id}/in-progress` }
          />
          <FavoriteBtn
            id={ id }
            type={ recipeType === 'meals' }
            currentRecipe={ recipeInProgress }
            testId="favorite-btn"
          />
        </section>
        <span
          data-testid="recipe-category"
          id="category-inProgress"
        >
          {strCategory}
        </span>
      </section>
      {wasCopied && <span>Link copiado!</span>}
      <section>

        <ul>
          {ingredients.map((recp, idx, arr) => (
            <li
              key={ idx }
              data-testid={ `${idx}-ingredient-step` }
            >
              <label htmlFor="ingredient">
                <input
                  type="checkbox"
                  id="ingredientCheck"
                  data-testid={ `${idx}-ingredient-name-and-measure` }
                  onChange={ () => updateLocalStorage(
                    {
                      idx, recipeType, id, setIsBtnDisable, arr,
                    },
                  ) }
                  defaultChecked={ checkLocalStorage(id, idx, recipeType) }
                />
                {`${recp[1]}`}
              </label>

            </li>))}
        </ul>
        <span
          data-testid="instructions"
          id="instructionsInProgress"
        >
          {strInstructions}
        </span>
      </section>
      <section id="finalizeContainer">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ isBtnDisable }
          onClick={ () => {
            savesFinished(recipeInProgress);
            saveDoneRecipes(id, recipeType, recipeInProgress);
            history.push('/receitas-feitas');
          } }
        >
          Finalizar receita
        </button>
      </section>

    </section>
  );
}

const mapStateToProps = (state) => ({
  inProgressRecipes: state.recipes.inProgressRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  savesFinished: (value) => dispatch(finishedRecipe(value)),
});

RecipeInProgress.propTypes = {
  inProgressRecipe: PropTypes.objectOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInProgress);
