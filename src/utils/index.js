import React from 'react';
import RecipeCard from '../components/RecipeCard';

const filterObj = (text, option) => Object.entries(option)
  .filter(([key, value]) => key.match(text) && value);

export const renderIngredients = (option) => {
  const ingredients = filterObj(/Ingredient/, option);
  const measures = filterObj(/Measure/, option);
  return ingredients.map(([key, ingredient], idx) => (
    <li key={ key } data-testid={ `${idx}-ingredient-name-and-measure` }>
      {`${ingredient} - ${measures[idx][1]}`}
    </li>
  ));
};

export const renderCheckBox = (option) => {
  const ingredients = filterObj(/Ingredient/, option);
  return ingredients.map(([key, ingredient], idx) => (
    <label htmlFor="checkbox" key={ `${key} - ${ingredient}` }>
      {ingredient}
      <input
        data-testid="ingredient-step"
        id="checkbox"
        type="checkbox"
      />
    </label>
  ));
};

export const renderCard = (option, defaultOption) => {
  const magic = 12;
  if (option && defaultOption) {
    const recipes = option.length ? option : defaultOption;
    const newRecipes = recipes.slice(0, magic);
    return <RecipeCard recipes={ newRecipes } />;
  }
  return [];
};

export const endPoint = ({ inputSearch, option, food }) => {
  let query = '';
  let db = '';
  switch (option) {
  case 'ingredient':
    query = `filter.php?i=${inputSearch}`;
    break;
  case 'name':
    query = `search.php?s=${inputSearch}`;
    break;
  case 'firstLetter':
    query = `search.php?f=${inputSearch}`;
    break;
  case 'category':
    query = `filter.php?c=${inputSearch}`;
    break;
  default:
    return false;
  }
  db = food ? 'themealdb' : 'thecocktaildb';
  return `https://www.${db}.com/api/json/v1/1/${query}`;
};
