/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

import {
  fetchAllRecipes,
  fetchRecipesBySearch,
  fetchRandomRecipe,
  fetchRecipesByArea,
} from '../services/recipesAPI';

function RecipesProvider({ children }) {
  const [user, setUser] = useState('');
  const [mealsOrDrinks, setMealsOrDrinks] = useState('meals');
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [redirectToMainScreen, setRedirectToMainScreen] = useState(false);
  const [redirectToRecipeDetails, setRedirectToRecipeDetails] = useState(false);
  const [startedRecipes, setStartedRecipes] = useState([]);

  const location = useLocation();

  const getInitialRecipes = async () => {
    const allRecipes = await fetchAllRecipes(mealsOrDrinks);
    setRecipes(allRecipes.meals);
  };

  const searchRecipesBy = async ({ searchParameter, searchPayload }) => {
    const recipesBySearch = await fetchRecipesBySearch(
      mealsOrDrinks, searchParameter, searchPayload,
    );
    setRecipes(recipesBySearch[mealsOrDrinks]);
  };

  const getRandomRecipe = async () => {
    const recipe = await fetchRandomRecipe(mealsOrDrinks);
    setRecipeDetails(recipe[mealsOrDrinks][0]);
    setRedirectToRecipeDetails(true);
  };

  const filterByIngredients = (searchPayload) => {
    searchRecipesBy({ searchParameter: 'ingredient', searchPayload });
    setRedirectToMainScreen(true);
  };

  const filterByArea = async ({ target: { value } }) => {
    if (value === 'All') {
      getInitialRecipes();
    } else {
      const { meals } = await fetchRecipesByArea(value);
      setRecipes(meals);
    }
  };

  //   [{
  //     id: id-da-receita,
  //     type: comida-ou-bebida,
  //     area: area-da-receita-ou-texto-vazio,
  //     category: categoria-da-receita-ou-texto-vazio,
  //     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  //     name: nome-da-receita,
  //     image: imagem-da-receita,
  //     doneDate: quando-a-receita-foi-concluida,
  //     tags: array-de-tags-da-receita-ou-array-vazio
  // }]

  const lookDetailsRecipe = (recipe) => {
    setRecipeDetails(recipe);
    setRedirectToRecipeDetails(true);
  };

  const localstorageSaveRecipe = (recipe) => {
    const recipeObj = {
      id: (recipe.idMeal) ? recipe.idMeal : recipe.idDrink,
      type: (recipe.idMeal) ? 'meal' : 'drink',
      area: (recipe.strArea) ? recipe.strArea : '',
      category: (recipe.strCategory) ? recipe.strCategory : '',
      alcoholicOrNot: (recipe.strAlcoholic) ? recipe.strAlcoholic : '',
      name: (recipe.strMeal) ? recipe.strMeal : recipe.strDrink,
      image: (recipe.strMealThumb) ? recipe.strMealThumb : recipe.strDrinkThumb,
      doneDate: (recipe.dateModified) ? recipe.dateModified : '',
      tags: (recipe.strTags) ? recipe.strTags : [],
    };
    let arrayOfRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    arrayOfRecipes = [...arrayOfRecipes, recipeObj];
    setStartedRecipes(arrayOfRecipes);
    localStorage.setItem('doneRecipes', JSON.stringify(arrayOfRecipes));
  };

  const context = {
    mealsOrDrinks,
    user,
    setUser,
    recipes,
    searchRecipesBy,
    recipeDetails,
    redirectToRecipeDetails,
    redirectToMainScreen,
    setRedirectToMainScreen,
    getRandomRecipe,
    setRedirectToRecipeDetails,
    filterByIngredients,
    filterByArea,
    lookDetailsRecipe,
    getInitialRecipes,
    startedRecipes,
    localstorageSaveRecipe,
  };

  useEffect(() => {
    if (!(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    getInitialRecipes();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('comidas')) {
      setMealsOrDrinks('meals');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes('bebidas')) {
      setMealsOrDrinks('drinks');
    }
  }, [location.pathname]);

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
