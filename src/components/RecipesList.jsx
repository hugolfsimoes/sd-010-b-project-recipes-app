import React, { useContext, useEffect } from 'react';
import RecipeContext from '../context';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';
import RecipeCard from './RecipeCard';

function RecipesList() {
  const { pathMeal, recipes, searchIngredient, searchOrigin } = useContext(RecipeContext);
  const [setRecipeUrl] = useFetchRecipesApi();

  useEffect(() => {
    if (searchIngredient) {
      setRecipeUrl({ url: pathMeal ? 'mealByIngredient' : 'drinkByIngredient',
        searchTerm: searchIngredient });
    } else {
      setRecipeUrl({ url: pathMeal ? 'meal' : 'drink' });
    }
  }, [pathMeal, searchOrigin]);

  function keyTransform(recipe) {
    if (recipe.idMeal) {
      return {
        ...recipe,
        id: recipe.idMeal,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
    }
    return {
      ...recipe,
      id: recipe.idDrink,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
  }

  return (
    <div>
      {recipes && recipes.map((recipe, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          recipe={ keyTransform(recipe) }
        />
      ))}
    </div>
  );
}

export default RecipesList;
