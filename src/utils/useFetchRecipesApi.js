// import { useState, useEffect, useContext } from 'react';
// import RecipeContext from '../context';

// const MAX_NUMBER_OF_ITEMS = 12;

// const useFetchRecipesApi = (maxResults = MAX_NUMBER_OF_ITEMS, suggestions = false) => {
//   const [recipeUrl, setRecipeUrl] = useState('');
//   const [suggestionsUrl, setSuggestionsUrl] = useState('');
//   const { setRecipes, setSuggestions } = useContext(RecipeContext);

//   useEffect(() => {
//     const getRecipes = async () => {
//       if (recipeUrl) {
//         const response = await fetch(recipeUrl)
//           .then((data) => data.json());
//         const result = recipeUrl.includes('meal')
//           ? response.meals.slice(0, maxResults)
//           : response.drinks.slice(0, maxResults);
//         if (suggestions) {
//           setSuggestions(result);
//         } else {
//           setRecipes(result);
//         }
//       }
//     };
//     getRecipes();
//   }, [recipeUrl]);

//   return [setRecipeUrl, suggestionsUrl, setSuggestionsUrl];
// };

// export default useFetchRecipesApi;

import { useState, useEffect, useContext } from 'react';
import RecipeContext from '../context';

const SEARCH_DRINK_GENERAL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const SEARCH_MEAL_GENERAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const SEARCH_DRINK_DETAIL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const SEARCH_MEAL_DETAIL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const SEARCH_DRINK_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const SEARCH_MEAL_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const SEARCH_DRINK_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const SEARCH_MEAL_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const SEARCH_RANDOM_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const SEARCH_RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const SEARCH_MEAL_BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

const MAX_NUMBER_OF_ITEMS = 12;

const useFetchRecipesApi = (maxResults = MAX_NUMBER_OF_ITEMS) => {
  const [recipeUrl, setRecipeUrl] = useState({});
  // const [suggestionsUrl, setSuggestionsUrl] = useState('');
  const { setRecipes, setSuggestions } = useContext(RecipeContext);

  const getRecipes = async (url) => {
    if (url) {
      const key = url.includes('meal') ? 'meals' : 'drinks';
      const response = await fetch(url)
        .then((data) => data.json());
      const result = response[key].slice(0, maxResults);
      if (recipeUrl.isSuggestion) {
        setSuggestions(result);
        console.log('é sugestão');
      } else {
        setRecipes(result);
        console.log('é receita');
      }
    }
  };

  const chooseUrl = (recipesUrl) => {
    switch (recipesUrl) {
    case 'meal':
      return SEARCH_MEAL_GENERAL;
    case 'drink':
      return SEARCH_DRINK_GENERAL;
    case 'mealDetail':
      return `${SEARCH_MEAL_DETAIL}${recipeUrl.searchTerm}`;
    case 'drinkDetail':
      return `${SEARCH_DRINK_DETAIL}${recipeUrl.searchTerm}`;
    case 'mealByCategory':
      return `${SEARCH_MEAL_BY_CATEGORY}${recipeUrl.searchTerm}`;
    case 'drinkByCategory':
      return `${SEARCH_DRINK_BY_CATEGORY}${recipeUrl.searchTerm}`;
    case 'mealByIngredient':
      return `${SEARCH_MEAL_BY_INGREDIENT}${recipeUrl.searchTerm}`;
    case 'drinkByIngredient':
      return `${SEARCH_DRINK_BY_INGREDIENT}${recipeUrl.searchTerm}`;
    case 'mealRandom':
      return SEARCH_RANDOM_MEAL;
    case 'drinkRandom':
      return SEARCH_RANDOM_DRINK;
    case 'mealByName':
      return SEARCH_MEAL_GENERAL;
    case 'drinkByName':
      return SEARCH_MEAL_GENERAL;
    case 'mealByOrigin':
      return `${SEARCH_MEAL_BY_AREA}${recipeUrl.searchTerm}`;
    default:
      break;
    }
  };

  useEffect(() => {
    console.log('entrou em recipes');
    console.log(recipeUrl.isSuggestion);
    console.log(recipeUrl.url);
    getRecipes(chooseUrl(recipeUrl.url));
  }, [recipeUrl]);

  // useEffect(() => {
  //   console.log('entrou em suggestions');
  //   console.log(suggestions);
  //   console.log(suggestionsUrl);
  //   getRecipes(chooseUrl(suggestionsUrl));
  // }, [suggestionsUrl]);

  return [setRecipeUrl];
};

export default useFetchRecipesApi;
