import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from '../context';
import useFetchFiltersApi from '../utils/useFetchFiltersApi';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

function OriginFilter() {
  const { filters } = useContext(RecipeContext);
  const [setRecipeUrl] = useFetchRecipesApi();
  const [setFilterUrl] = useFetchFiltersApi();
  const [origin, setOrigin] = useState('All');

  function filterByOrigin() {
    return origin === 'All'
      ? setRecipeUrl({ url: 'meal' })
      : setRecipeUrl({ url: 'mealByOrigin', searchTerm: origin });
  }

  useEffect(() => {
    setFilterUrl('mealArea');
  }, [filters]);

  useEffect(() => {
    filterByOrigin();
  }, [origin]);

  function handleChange({ target: { value } }) {
    setOrigin(value);
  }

  return (
    <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
      {[{ strArea: 'All' }, ...filters].map(({ strArea }, index) => (
        <option
          key={ `${strArea}${index}` }
          data-testid={ `${strArea}-option` }
        >
          { strArea }
        </option>
      ))}
    </select>
  );
}

export default OriginFilter;
