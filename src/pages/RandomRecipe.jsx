import React, { useContext, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import RecipeContext from '../context';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

function RandomRecipes() {
  const { recipes, pathMeal, isRandom, setIsRandom } = useContext(RecipeContext);
  const [setRecipeUrl] = useFetchRecipesApi();

  // https://stackoverflow.com/questions/53255951/equivalent-to-componentdidupdate-using-react-hooks
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setIsRandom(true);
    }
    setRecipeUrl({ url: pathMeal ? 'mealRandom' : 'drinkRandom' });
    return () => setIsRandom(false);
  }, [recipes]);

  return (
    <div>
      {isRandom && (
        <Redirect
          to={ pathMeal ? `/comidas/${recipes[0].idMeal}`
            : `/bebidas/${recipes[0].idDrink}` }
        />
      )}
    </div>
  );
}

export default RandomRecipes;
