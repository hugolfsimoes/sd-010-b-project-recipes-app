import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/contextRecipes';
import './RecommendedFood.css';

function RecommendedDrinks() {
  const { drinksRec, setDrinksRec } = useContext(ContextRecipes);
  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => setDrinksRec(response.drinks));
  }, [setDrinksRec]);

  const MAGIC_NUMBER = 6;

  return (
    <section className="scroll">
      { drinksRec.map(({ strDrink, strDrinkThumb }, index) => index < MAGIC_NUMBER
            && (
              <div data-testid={ `${index}-recomendation-card` }>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  width="150px"
                  data-testid="recipe-photo"
                />
                <p data-testid={ `${index}-recomendation-title` }>{ strDrink }</p>
              </div>)) }
    </section>
  );
}

export default RecommendedDrinks;
