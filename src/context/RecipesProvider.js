import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const TWELVE = 12;
export default function RecipesProvider({ children }) {
  const [searchResult, setSearchResult] = useState([]);
  const [userInfo, setInfo] = useState({ email: '' });
  const [limit, setLimit] = useState(TWELVE);
  const [ingredientsResults, setIngredientsResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  function readFavoritesFromStorage() {
    if (localStorage.getItem('favoriteRecipes')) {
      const arrayFavorit = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorites(arrayFavorit);
    }
  }

  useEffect(() => {
    readFavoritesFromStorage();
  }, []);

  const context = {
    setInfo,
    userInfo,
    searchResult,
    setSearchResult,
    limit,
    setLimit,
    ingredientsResults,
    setIngredientsResults,
    favorites,
    setFavorites,
    readFavoritesFromStorage,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
