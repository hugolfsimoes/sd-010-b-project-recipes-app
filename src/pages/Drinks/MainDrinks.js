import React, { useState, useEffect } from 'react';
import FilterRecipe from '../../components/FilterRecipe';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import RecipeList from '../../components/RecipeList';
import { fetchCategoryDrinks, fetchRecipeAllDrink,
  fetchRecipeIngredientsExploreDrink } from '../../services/recipeAPI';

// ERRO DE REQUISITOS - FETCH FAIL
function MainDrinks(match) {
  const [list, setList] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState({});

  useEffect(() => {
    let fun;
    const func = async () => {
      if (match.location.ingredient) {
        fun = await fetchRecipeIngredientsExploreDrink(match.location.ingredient);
        setLoading(false);
      } else {
        fun = await fetchRecipeAllDrink();
        setLoading(false);
      }
      const category = await fetchCategoryDrinks();

      setCategoryList(category || {});
      setList(fun);
    };

    func();
  }, [match.location.ingredient]);

  return (
    <>
      { loading ? <Loading />
        : (<div className="main-food-class">
          <Header title="Bebidas" display="true" />
          { Object.keys(categoryList).length !== 0 && <FilterRecipe
            list={ categoryList }
            recipeType="drinks"
          />}
          {Object.keys(list).length !== 0
        && <RecipeList listAll={ list } />}
          <Footer />
        </div>)}
    </>
  );
}

export default MainDrinks;
