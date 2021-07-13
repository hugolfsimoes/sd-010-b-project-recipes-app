/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';
import {
  fetchAPI, getCategories,
} from '../services/fetchAPI';

const foodsEndPoint = 'https://www.themealdb.com/api/json/v1/1/';
const drinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/';
const initialParams = { chosenFilter: 'search.php?s=', searchText: '' };

function GlobalProvider({ children }) {
  const [baseEndPoint, setBaseEndPoint] = useState(foodsEndPoint);
  const [requestParams, setRequestParams] = useState(initialParams);
  const [requestResult, setRequestResult] = useState({ drinks: [], meals: [] });
  const [categories, setCategories] = useState({ drinks: [], meals: [] });
  const [details, setDetails] = useState({});
  const [recomendationsDrinks, setRecomendationsDrinks] = useState();
  const [recomendationsFoods, setRecomendationsFoods] = useState();
  const [drinks, setDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [toggle, setToggle] = useState({
    categoryName: '', status: false, backup: { drinks, meals } });
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const { chosenFilter, searchText } = initialParams;
      setCategories(await getCategories());
      setRequestResult(await fetchAPI(foodsEndPoint, chosenFilter, searchText));
      setRequestResult(await fetchAPI(drinksEndPoint, chosenFilter, searchText));
    } fetchCategories();
  }, []);

  useEffect(() => {
    if (requestResult.meals) {
      setMeals(requestResult.meals);
      setRecomendationsFoods(requestResult.meals);
      setToggle({
        ...toggle, backup: { ...toggle.backup, meals: requestResult.meals } });
    }
    if (requestResult.drinks) {
      setDrinks(requestResult.drinks);
      setRecomendationsDrinks(requestResult.drinks);
      setToggle({
        ...toggle, backup: { ...toggle.backup, drinks: requestResult.drinks } });
    }
    if (!requestResult[Object.keys(requestResult)[0]]) {
      global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [requestResult]);

  const handleChange = ({ target: { name, value } }) => {
    setRequestParams({ ...requestParams, [name]: value });
  };

  const generateIngredientsAndMeasure = (object) => {
    const FatherObject = {
      ingredient: {},
      measure: {},
    };
    Object.keys(object).forEach((eachKey) => {
      if ((eachKey.includes('strMeasure'))
      && (object[eachKey] !== '' && object[eachKey] !== null)) {
        FatherObject.measure[eachKey] = object[eachKey];
      }
      if ((eachKey.includes('strIngredient'))
      && (object[eachKey] !== '' && object[eachKey] !== null)) {
        FatherObject.ingredient[eachKey] = object[eachKey];
      }
    });
    return FatherObject;
  };

  const resetParams = () => {
    setRequestParams(initialParams);
  };

  const handleToggle = (categoryName, status) => {
    if (categoryName === toggle.categoryName || toggle.categoryName === '') {
      setToggle({ ...toggle, categoryName, status });
    } else {
      setToggle({ ...toggle, categoryName, status });
    }
  };

  const updateEndPoint = (type) => {
    if (type === 'drinks') {
      setBaseEndPoint(drinksEndPoint);
    } else setBaseEndPoint(foodsEndPoint);
  };

  const randomRecipe = async () => {
    const response = await fetchAPI(baseEndPoint, 'random.php', '');
    if (response.meals) {
      return response.meals[0].idMeal;
    } return response.drinks[0].idDrink;
  };

  const asyncSetState = async () => {
    const { chosenFilter, searchText } = requestParams;
    const result = await fetchAPI(baseEndPoint, chosenFilter, searchText);
    if (result) {
      setRequestResult(result);
    }
  };

  const detailsSyncSetState = async (endPoint) => {
    const result = await fetchAPI(endPoint, '', '');
    if (result) {
      setDetails(result);
    }
  };

  const manageRenderMeal = (cardList) => {
    if (meals.length === 1 && requestParams.searchText.length > 0) {
      const mealId = meals[0].idMeal;
      return <Redirect to={ `/comidas/${mealId}` } />;
    } if (meals.length >= 1) {
      return cardList;
    }
  };

  const manageRenderDrink = (cardList) => {
    if (drinks.length === 1 && requestParams.searchText.length > 0) {
      const drinkId = drinks[0].idDrink;
      return <Redirect to={ `/bebidas/${drinkId}` } />;
    } if (drinks.length >= 1) {
      return cardList;
    }
  };

  const filterCategory = async (category) => {
    const filterType = 'filter.php?c=';
    let resultFilter = {};
    if (category) {
      resultFilter = await fetchAPI(baseEndPoint, filterType, category);
      if (resultFilter.meals) {
        setMeals(resultFilter[Object.keys(resultFilter)[0]]);
      } else {
        setDrinks(resultFilter[Object.keys(resultFilter)[0]]);
      }
    } else if (baseEndPoint === foodsEndPoint) {
      setMeals(toggle.backup.meals);
    } else {
      setDrinks(toggle.backup.drinks);
    }
  };

  const contextValue = {
    baseEndPoint,
    requestParams,
    meals,
    drinks,
    categories,
    details,
    recomendationsDrinks,
    recomendationsFoods,
    toggle,
    refresh,
    resetParams,
    updateEndPoint,
    handleChange,
    asyncSetState,
    manageRenderMeal,
    manageRenderDrink,
    setDetails,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
    filterCategory,
    handleToggle,
    setRefresh,
    randomRecipe,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

export default GlobalProvider;

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};