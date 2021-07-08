import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { GlobalContext } from '../context/Provider';
import RecipeCard from '../components/RecipeCard';

const SearchArea = () => {
  const magic = 12;
  const { area, meals: m, recipes, setSearchOp } = useContext(GlobalContext);
  const [filter, setFilter] = useState('');
  const meals = recipes.meals ? recipes.meals : m;
  console.log(meals);
  const mealsFilter = meals.slice(0, magic);
  const dropBox = () => (
    <select
      onChange={ ({ target: { value } }) => {
        console.log('value', value);
        setFilter(value);
        setSearchOp({ inputSearch: value, option: 'area', food: true });
      } }
      value={ filter }
      data-testid="explore-by-area-dropdown"
    >
      {area.map(({ strArea }) => (
        <option data-testid={ `${strArea}-option` } key={ strArea } value={ strArea }>
          {strArea}
        </option>
      ))}
    </select>
  );

  return (
    <div>
      <Header title="Explorar Origem" search />
      <h1>Search Area</h1>
      {dropBox()}
      <RecipeCard recipes={ mealsFilter } />
      <Footer />
    </div>
  );
};

export default SearchArea;
