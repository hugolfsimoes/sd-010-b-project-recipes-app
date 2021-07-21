import React, { useContext, useEffect } from 'react';
import RecipeContext from '../context';
import useFetchFiltersApi from '../utils/useFetchFiltersApi';
import useFetchRecipesApi from '../utils/useFetchRecipesApi';

const MAX_CATEGORIES = 5;
function CategoryFilter() {
  const [setRecipeUrl] = useFetchRecipesApi();
  const [setFilterUrl] = useFetchFiltersApi(MAX_CATEGORIES);
  const {
    pathMeal,
    filters,
    setSelectedCategory,
    selectedCategory,
    setToggleBtnCategories,
  } = useContext(RecipeContext);

  useEffect(() => {
    setFilterUrl(pathMeal ? 'mealCategory' : 'drinkCategory');
  }, [filters, pathMeal]);

  function handleClick(category) {
    if (selectedCategory === category || category === 'All') {
      setToggleBtnCategories(false);
      setSelectedCategory('');
      setRecipeUrl({ url: pathMeal ? 'meal' : 'drink' });
    } else {
      setToggleBtnCategories(true);
      setSelectedCategory(category);
      setRecipeUrl({ url: pathMeal ? 'mealByCategory' : 'drinkByCategory',
        searchTerm: category });
    }
  }

  return (
    <div>
      {[{ strCategory: 'All' }, ...filters].map(({ strCategory }) => (
        <button
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          key={ strCategory }
          onClick={ () => handleClick(strCategory) }
        >
          { strCategory }
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
