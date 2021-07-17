import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [foodsAPI, setfoodsAPI] = useState('');
  const [drinksAPI, setDrinksAPI] = useState('');
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');
  const [foodEndpoint, setFoodEndPoint] = useState('');
  const [drinkEndpoint, setDrinkEndpoint] = useState('');
  // const [idFood, setIdFood] = useState('');
  const [idDrinks, setIdDrinks] = useState('');
  const [category, setCategories] = useState();
  const [categoryDrink, setCategoriesDrink] = useState();
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [favoriteRecipesList, setFavoriteRecipesList] = useState([]);
  const [detailsRecipe, setDetailsRecipe] = useState();
  const [countCheck, setCountCheck] = useState(0);
  const [endpointMaster, setEndPointMaster] = useState({ pointAPI: '', pointURL: '' });
  const [idMaster, setIdMaster] = useState('');
  const [masterAPI, setMasterAPI] = useState('');
  // useEffect(() => {
  //   const getFood = async (endpoints) => {
  //     const limit = 12;
  //     const { meals } = await fetch(endpoints).then((response) => response.json());
  //     if (meals === null) {
  //       return (
  //         global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros')
  //       );
  //     }
  //     if (meals.length <= 1) {
  //       setIdFood(meals[0].idMeal);
  //     }
  //     const result = meals.slice(0, limit);
  //     setfoodsAPI(result);
  //   };
  //   getFood(foodEndpoint);
  // }, [foodEndpoint]);

  useEffect(() => {
    const getPoint = async (endpoints) => {
      const limit = 12;
      const data = await fetch(endpoints.pointAPI);
      const resp = await data.json();
      const result = resp[endpoints.pointURL === 'food' ? 'meals' : 'drinks'];
      console.log('result', result);
      if (result === null) {
        return (
          global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        );
      }
      if (result.length <= 1) {
        const pathID = result[0][endpoints.pointURL === 'food' ? 'idMeal' : 'idDrink'];
        setIdMaster(pathID);
      }
      setMasterAPI(result.slice(0, limit));
    };
    getPoint(endpointMaster);
  }, [endpointMaster]);

  useEffect(() => {
    const getDrink = async (endpoints) => {
      const limit = 12;
      const { drinks } = await fetch(endpoints).then((response) => response.json());
      if (drinks === null) {
        return (
          global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        );
      }
      if (drinks.length <= 1) {
        setIdDrinks(drinks[0].idDrink);
      }
      const result = drinks.slice(0, limit);
      setDrinksAPI(result);
    };
    getDrink(drinkEndpoint);
  }, [drinkEndpoint]);

  const getCategories = async () => {
    const limit = 5;
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((r) => r.json());
    const result = meals.meals.slice(0, limit);
    setCategories(result);
  };
  const getCategoriesDrink = async () => {
    const limit = 5;
    const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((r) => r.json());
    const result = drinks.slice(0, limit);
    setCategoriesDrink(result);
  };
  useEffect(() => {
    getCategories();
    getCategoriesDrink();
  }, []);

  const handleFood = async () => {
    if (radio === 'firstLetter' && search.length > 1) {
      return (
        global.alert('Sua busca deve conter somente 1 (um) caracter')
      );
    }
    if (radio === 'ingredient') {
      setFoodEndPoint(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    }
    if (radio === 'name') {
      setFoodEndPoint(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    }
    if (radio === 'firstLetter' && search.length <= 1) {
      setFoodEndPoint(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    }
  };

  const contextValue = {
    radio,
    setRadio,
    handleFood,
    foodsAPI,
    drinksAPI,
    idFood,
    idDrinks,
    setFoodEndPoint,
    setDrinkEndpoint,
    category,
    categoryDrink,
    setfoodsAPI,
    foodEndpoint,
    doneRecipesList,
    setDoneRecipesList,
    favoriteRecipesList,
    setFavoriteRecipesList,
    setSearch,
    search,
    detailsRecipe,
    setDetailsRecipe,
    countCheck,
    setCountCheck,
    idMaster,
    setEndPointMaster,
    endpointMaster,
    masterAPI,
  };

  return (
    <AppContext.Provider value={ contextValue }>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
