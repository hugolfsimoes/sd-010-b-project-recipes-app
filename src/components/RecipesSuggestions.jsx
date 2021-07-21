import React, { useContext, useEffect } from 'react';
import RecipeContext from '../context';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

const MAX_SUGGESTIONS = 6;

function RecipesSuggestions() {
  const { pathMeal, suggestions } = useContext(RecipeContext);
  const [setRecipeUrl] = useFetchRecipesApi(MAX_SUGGESTIONS);
  const param = pathMeal ? 'strDrink' : 'strMeal';

  useEffect(() => {
    console.log('hello');
    setRecipeUrl({ url: pathMeal ? 'drink' : 'meal', isSuggestion: true });
    console.log(suggestions);
  }, []);

  return (
    <div>
      {
        suggestions.length > 0 && suggestions.map((suggestion, index) => (
          <div
            key={ `${suggestion[param]}${index}` }
            style={ { display: index > 1 ? 'none' : '' } }
            data-testid={ `${index}-recomendation-card` }
          >
            <p data-testid={ `${index}-recomendation-title` }>{suggestion[param]}</p>
            <img src={ suggestion[`${param}Thumb`] } alt={ suggestion[param] } />
          </div>
        ))
      }
    </div>

  );
}

export default RecipesSuggestions;
