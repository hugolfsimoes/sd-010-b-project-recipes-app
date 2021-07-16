import React, { useState, useEffect } from 'react';
import FilterRecipe from '../../components/FilterRecipe';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import RecipeList from '../../components/RecipeList';
import { fetchCategoryFood, fetchRecipeAllFood,
  fetchRecipeIngredientsExploreFood } from '../../services/recipeAPI';

export default function MainFood(match) {
  const [list, setList] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState({});

  // ERRO DE REQUISITOS - FETCH FAIL
  useEffect(() => {
    let fun;
    const func = async () => {
      if (match.location.ingredient) {
        fun = await fetchRecipeIngredientsExploreFood(match.location.ingredient);
        setLoading(false);
      } else {
        fun = await fetchRecipeAllFood();
        setLoading(false);
      }
      const category = await fetchCategoryFood();

      setList(fun);
      console.log('category-Mainfood', category);
      setCategoryList(category || {});
    };

    func();
  }, [match.location.ingredient]);
  return (
    <>
      { loading ? <Loading />
        : (<div
            className="main-food-class"
        >
          <Header title="Comidas" display="true" />
          { Object.keys(categoryList).length !== 0 && <FilterRecipe
            list={ categoryList }
            recipeType="food"
          />}
          {Object.keys(list).length !== 0
        && <RecipeList listAll={ list } />}
          <Footer />
           </div>)}
    </>

  );
}
