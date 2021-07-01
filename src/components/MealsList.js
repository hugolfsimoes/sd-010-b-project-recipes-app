import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import MealsContext from '../context/meals.context';

function MealsList() {
  const MAX_CARDS = 12;
  const { meals } = useContext(MealsContext);
  const history = useHistory();

  return (
    <div className="card-list">
      {meals.map((item, index) => {
        if (index < MAX_CARDS) {
          return (
            <button
              type="button"
              className="card"
              key={ item.idMeal }
              onClick={ () => history.push(`/comidas/${item.idMeal}`) }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                className="card-image"
                src={ item.strMealThumb }
                alt={ item.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <span data-testid={ `${index}-card-name` }>{item.strMeal}</span>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}

export default MealsList;
