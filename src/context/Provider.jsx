import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [masterAPI, setMasterAPI] = useState('');
  const [endpointMaster, setEndPointMaster] = useState({ pointAPI: '', pointURL: '' });
  const [idMaster, setIdMaster] = useState('');
  const [radio, setRadio] = useState('');
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [favoriteRecipesList, setFavoriteRecipesList] = useState([]);
  const [detailsRecipe, setDetailsRecipe] = useState();
  const [countCheck, setCountCheck] = useState(0);

  const triggerDrink = {
    ingredient: (ingredient) => setEndPointMaster({ pointAPI: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`, pointURL: 'drink' }),
    name: (name) => setEndPointMaster({ pointAPI: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`, pointURL: 'drink' }),
    firstLetter: (letter) => setEndPointMaster({ pointAPI: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`, pointURL: 'drink' }),
    all: () => setEndPointMaster({ pointAPI: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', pointURL: 'drink' }),
    category: (strCategory) => setEndPointMaster({ pointAPI: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`, pointURL: 'drink' }),
  };

  const triggerFood = {
    ingredient: (ingredient) => setEndPointMaster({ pointAPI: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`, pointURL: 'food' }),
    name: (name) => setEndPointMaster({ pointAPI: `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`, pointURL: 'food' }),
    firstLetter: (letter) => setEndPointMaster({ pointAPI: `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`, pointURL: 'food' }),
    all: () => setEndPointMaster({ pointAPI: 'https://www.themealdb.com/api/json/v1/1/search.php?s=', pointURL: 'food' }),
    category: (strCategory) => setEndPointMaster({ pointAPI: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`, pointURL: 'food' }),
  };

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

  const contextValue = {
    radio,
    setRadio,
    doneRecipesList,
    setDoneRecipesList,
    favoriteRecipesList,
    setFavoriteRecipesList,
    detailsRecipe,
    setDetailsRecipe,
    countCheck,
    setCountCheck,
    idMaster,
    setEndPointMaster,
    endpointMaster,
    masterAPI,
    triggerDrink,
    triggerFood,
  };

  return (
    <AppContext.Provider value={ contextValue }>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
