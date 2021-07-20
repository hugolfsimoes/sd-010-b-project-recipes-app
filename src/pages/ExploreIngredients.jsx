import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getIngredientsMealsList,
  getIngredientsDrinksList,
  getFilterIngredientListMeal,
  getFilterIngredientListDrink } from '../services';
import { Footer, Header } from '../components';
import { renderFiltered, updateRecipes } from '../actions';
import "./css/ingredientsListStyle.css";

function ExploreIngredients({ history, shouldRenderFiltered, updateFiltered }) {
  const { pathname } = history.location;
  const TWELVE = 12;
  const [ingredientsMeals, setIngredientsMeals] = useState([]);
  const [ingredientsDrinks, setIngredientsDrinks] = useState([]);
  const [choiceIngredMeal, setChoiceIngredMeal] = useState('');
  const [filteredBy, setFilteredBy] = useState('');

  useEffect(() => {
    const getIngredients = async () => {
      const respMeals = await getIngredientsMealsList();
      const respDrinks = await getIngredientsDrinksList();
      setIngredientsMeals(respMeals.slice(0, TWELVE));
      setIngredientsDrinks(respDrinks.slice(0, TWELVE));
    };
    getIngredients();
  }, [choiceIngredMeal]);

  useEffect(() => {
    const filterByIngredientMeal = async () => {
      if (filteredBy !== choiceIngredMeal) {
        setFilteredBy(choiceIngredMeal);
        const response = pathname.includes('/comidas')
          ? await getFilterIngredientListMeal(choiceIngredMeal)
          : await getFilterIngredientListDrink(choiceIngredMeal);
        shouldRenderFiltered(true);
        updateFiltered(response.slice(0, TWELVE));
      } else {
        shouldRenderFiltered(false);
        setFilteredBy('');
      }
    };
    filterByIngredientMeal();
  }, [choiceIngredMeal, filteredBy, pathname, shouldRenderFiltered, updateFiltered]);

  const ingredientImgMeal = (name) => (
    `https://www.themealdb.com/images/ingredients/${name}-Small.png`);
  const ingredientImgDrink = (name) => (
    `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`);

  const renderMealsIngredients = () => (
    <article
      id="ingredientContainer"
    >
      {ingredientsMeals.map((item, index) => (
        <section
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => setChoiceIngredMeal(item.strIngredient) }
          onKeyDown={ () => history.push('/comidas') }
          role="button"
          tabIndex={ 0 }
          className="ingredient"
        >
          <Link to="/comidas">
            <p data-testid={ `${index}-card-name` }>
              {item.strIngredient}
            </p>

            <img
              data-testid={ `${index}-card-img` }
              src={ ingredientImgMeal(item.strIngredient) }
              alt={ item.strIngredient }
            />
          </Link>
        </section>))}
    </article>
  );

  const renderDrinksIngredients = () => (
    <article id="ingredientContainer">
      {ingredientsDrinks.map((item, index) => (
        <section
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          className="ingredient"
        >
          <p data-testid={ `${index}-card-name` }>
            {item.strIngredient1}
          </p>

          <img
            data-testid={ `${index}-card-img` }
            src={ ingredientImgDrink(item.strIngredient1) }
            alt={ item.strIngredient1 }
          />
        </section>))}
    </article>
  );

  return (
    <section>
      <Header />
      {pathname.includes('comidas')
        ? renderMealsIngredients() : renderDrinksIngredients()}
      <Footer />
    </section>
  );
}

ExploreIngredients.propTypes = {
  history: PropTypes.object,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  updateFiltered: (value) => dispatch(updateRecipes(value)),
  shouldRenderFiltered: (value) => dispatch(renderFiltered(value)),
});

export default connect(null, mapDispatchToProps)(ExploreIngredients);
