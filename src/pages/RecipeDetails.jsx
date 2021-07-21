import React, { useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import RecipeContext from '../context';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';
import { handleIsStored } from '../helpers/handleStorageKeys';
import IngredientsList from '../components/IngredientsList';
import RecipesSuggestions from '../components/RecipesSuggestions';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import EmbedVideo from '../components/EmbedVideo';
import useRecipeParams from '../utils/useRecipeParams';
import IngredientsCheckList from '../components/IngredientsCheckList';
import ButtonStartRecipe from '../components/ButtonStartRecipe';
import ButtonFinishRecipe from '../components/ButtonFinishRecipe';

function RecipeDetails() {
  const { id } = useParams();
  const [setRecipeUrl] = useFetchRecipesApi();
  const [recipeParams] = useRecipeParams();
  const { key, strInstructions } = recipeParams;
  const { recipes, pathMeal, setIdProgress, setIsFavorite } = useContext(RecipeContext);
  const { pathname } = useLocation();
  const progress = pathname.includes('progress');

  const isDone = handleIsStored({ id, storageKey: 'doneRecipes' });

  useEffect(() => {
    // if (progress) setIdProgress(id);
    setIsFavorite(handleIsStored({ id, storageKey: 'favoriteRecipes' }));
    setRecipeUrl({ url: pathMeal ? 'mealDetail' : 'drinkDetail',
      searchTerm: id });
  }, []);

  useEffect(() => {
    console.log('progresso...');
    if (progress) setIdProgress(id);
  }, [progress]);

  return (
    <div>
      {recipes.length === 1 && (
        <div>
          <RecipeDetailsCard />
          {progress ? <IngredientsCheckList keyInProgress={ key } />
            : <IngredientsList />}
          <p data-testid="instructions">{strInstructions}</p>
          {!progress && (
            <>
              {pathMeal && <EmbedVideo />}
              <RecipesSuggestions />
            </>)}
          {progress ? <ButtonFinishRecipe /> : !isDone && (<ButtonStartRecipe />)}
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
