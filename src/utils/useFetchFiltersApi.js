import { useState, useEffect, useContext } from 'react';
import RecipeContext from '../context';

const MEAL_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINKS_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const MEAL_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINK_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const MEAL_AREA = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

const useFetchFiltersApi = (maxResults) => {
  const [filterUrl, setFilterUrl] = useState('');
  const { setFilters } = useContext(RecipeContext);

  const getRecipes = async (url) => {
    if (filterUrl) {
      const key = url.includes('meal') ? 'meals' : 'drinks';
      const response = await fetch(url)
        .then((data) => data.json());
      const result = response[key].slice(0, maxResults);
      setFilters(result);
    }
  };

  const chooseUrl = (recipesUrl) => {
    switch (recipesUrl) {
    case 'mealCategory':
      return MEAL_CATEGORIES;
    case 'drinkCategory':
      return DRINKS_CATEGORIES;
    case 'mealIngredients':
      return MEAL_INGREDIENTS;
    case 'drinkIngredients':
      return DRINK_INGREDIENTS;
    case 'mealArea':
      return MEAL_AREA;
    default:
      break;
    }
  };

  useEffect(() => {
    getRecipes(chooseUrl(filterUrl));
  }, [filterUrl]);

  return [setFilterUrl];
};

export default useFetchFiltersApi;
