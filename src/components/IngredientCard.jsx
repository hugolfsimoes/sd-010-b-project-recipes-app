import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context';
import useFetchFiltersApi from '../utils/useFetchFiltersApi';

const MAX_RESULTS = 12;
const IMG_SRC = 'https://www.themealdb.com/images/ingredients/';

function IngredientCard() {
  const { pathMeal, filters, setSearchIngredient } = useContext(RecipeContext);
  const [setFilterUrl] = useFetchFiltersApi(MAX_RESULTS);

  useEffect(() => {
    setFilterUrl(pathMeal ? 'mealIngredients' : 'drinkIngredients');
  }, [filters]);

  return (
    <>
      {filters.map((ingredient, index) => {
        const name = pathMeal ? ingredient.strIngredient : ingredient.strIngredient1;
        return (
          <Link
            to={ pathMeal ? '/comidas' : '/bebidas' }
            key={ name }
            onClick={ () => setSearchIngredient(name) }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ `${IMG_SRC}${name}-Small.png` }
                alt={ name }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ name }</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default IngredientCard;
