import { useContext, useEffect, useState } from 'react';
import RecipeContext from '../context';

function useRecipeParams() {
  const [recipeParams, setRecipeParams] = useState({});
  const { recipes, pathMeal } = useContext(RecipeContext);
  const { strCategory, idMeal, idDrink, strMeal, strDrink, strMealThumb, strDrinkThumb,
    strAlcoholic, strArea } = recipes[0];

  const commonInfo = {
    ...recipes[0],
    area: strArea,
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
  };
  const recipe = pathMeal
    ? {
      ...commonInfo,
      key: 'meals',
      type: 'comida',
      id: idMeal,
      name: strMeal,
      image: strMealThumb,
    }
    : {
      ...commonInfo,
      key: 'cocktails',
      type: 'bebida',
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
    };

  useEffect(() => {
    setRecipeParams(recipe);
  }, [recipes]);

  return [recipeParams];
}

export default useRecipeParams;
