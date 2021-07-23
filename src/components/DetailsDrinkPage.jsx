import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';
import AllTagsFromDetailsDrinks from './AllTagsFromDetailsDrinks';
import BtnStartDrinkRecipe from './BtnStartDrinkRecipe';

function DetailsDrinkPage({ match: { params } }) {
  const { drinks, setDrinks, setIsLoading } = useContext(ContextRecipes);
  const { id } = params;
  useEffect(() => {
    const getRecipes = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((results) => setDrinks(results.drinks))
        .then(() => setIsLoading(false));
    };
    getRecipes();
  }, [id, setDrinks, setIsLoading]);

  if (!drinks || drinks[0] === undefined) return <h1>Carregando...</h1>;

  return (
    <div>
      <AllTagsFromDetailsDrinks drinks={ drinks } />
      <BtnStartDrinkRecipe id={ id } />
    </div>
  );
}

DetailsDrinkPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default DetailsDrinkPage;
