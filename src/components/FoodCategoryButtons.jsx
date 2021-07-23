import React, { useContext, useEffect, useState } from 'react';
import ContextRecipes from '../context/contextRecipes';

function FoodCategoryButtons() {
  const { setRecipes,
    foodCategoryName, setFoodCategoryName, setToggleFood,
    toggleFood } = useContext(ContextRecipes);
  const [buttonSelected, setbuttonSelected] = useState('All');
  const maxLength = 4;

  const fetchFoodCategories = (category) => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((results) => setRecipes(results.meals))
      .catch((error) => console.log(error));
  };

  const fetchFoodRecipes = () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setRecipes(results.meals)));
  };

  const handleClick = (category) => {
    if (category === 'All') {
      return fetchFoodRecipes();
    }
    if (toggleFood === false || category !== buttonSelected) {
      fetchFoodCategories(category);
      setbuttonSelected(category);
      setToggleFood(true);
    } else {
      setbuttonSelected('All');
      fetchFoodRecipes();
    }
    console.log(toggleFood, buttonSelected);
  };

  const fetchFoodCategoryName = () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setFoodCategoryName(results.meals)));
  };

  useEffect(() => {
    fetchFoodCategoryName();
  });

  return (
    <div>
      <button
        type="button"
        onClick={ () => handleClick('All') }
        data-testid="All-category-filter"
      >
        All
      </button>
      {foodCategoryName.map(({ strCategory }, index) => index <= maxLength && (
        <button
          key={ index }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleClick(strCategory) }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}

export default FoodCategoryButtons;
