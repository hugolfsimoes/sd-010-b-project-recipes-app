import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealDetails, getDrinkDetails } from '../services';
import { checkDoneRecipes, checkProgress } from '../services/localStorageManager';
import './FoodDetails.css';
import {
  RecDrinks,
  RecMeals,
  MealClip,
  IngList,
  FavoriteBtn,
  ShareBtn } from '../components';

function FoodDetails({ match, history }) {
  const { params: { id } } = match;
  const { location: { pathname } } = history;
  const [details, setDetails] = useState([{}]);
  const [wasCopied, setWasCopied] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [donerecipe, setDoneRecipe] = useState(true);
  const [type, setType] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (pathname.includes('/comidas')) {
        const meal = await getMealDetails(id);
        setDetails(meal);
        setIsStarted(checkProgress(id, 'meals'));
      }
      if (pathname.includes('bebidas')) {
        setType(false);
        const drink = await getDrinkDetails(id);
        setDetails(drink);
        setIsStarted(checkProgress(id, 'cocktails'));
      }
    };
    fetchDetails();
    setDoneRecipe(checkDoneRecipes(id));
  }, [pathname, id]);

  const startRecipe = () => {
    history.push(`${pathname}/in-progress`);
  };

  const {
    strCategory,
    strYoutube,
    strAlcoholic,
    strMeal,
    strDrink,
    strInstructions,
    strMealThumb,
    strDrinkThumb } = details[0];

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt={ strMeal || strDrink }
      />
      <h3 data-testid="recipe-title">{strMeal || strDrink}</h3>
      <FavoriteBtn id={ id } type={ type } currentRecipe={ details[0] } />
      <ShareBtn showCopiedMsg={ setWasCopied } />
      {wasCopied && <span>Link copiado!</span>}
      <div>
        {
          strAlcoholic
            ? <h4 data-testid="recipe-category">Alcoholic</h4>
            : <h4 data-testid="recipe-category">{strCategory}</h4>
        }
        <p data-testid="instructions">{strInstructions}</p>
        <IngList details={ details[0] } />
        <div>
          <MealClip strYoutube={ strYoutube } />
        </div>
        {
          pathname.includes('/comida')
            ? <RecDrinks id={ id } />
            : <RecMeals id={ id } />
        }
      </div>
      <button
        className="start-btn"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ startRecipe }
        style={ { visibility: donerecipe ? 'hidden' : 'visible' } }
      >
        {
          isStarted
            ? 'Continuar Receita'
            : 'Iniciar Receita'
        }
      </button>
    </>
  );
}

FoodDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.objectOf.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodDetails;