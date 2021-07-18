import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import CardFavorit from '../components/CardFavorit';
import RecipesContext from '../context/RecipesContext';

export default function FavoritesRecipes() {
  const [renderer, setRenderer] = useState([]);
  const [allFavorit, setAllFavorit] = useState([]);

  const { favorites } = useContext(RecipesContext);

  useEffect(() => {
    if (favorites) {
      setAllFavorit(favorites);
      setRenderer(favorites);
    }
  }, [favorites]);

  function handleAllBtn() {
    setRenderer(allFavorit);
  }

  function handleFoodBtn() {
    const foodsRecipes = allFavorit.filter((recipes) => recipes.type === 'comida');
    setRenderer(foodsRecipes);
  }

  function handleDrinksBtn() {
    const drinksRecipes = allFavorit.filter((recipes) => recipes.type === 'bebida');
    setRenderer(drinksRecipes);
  }

  return (
    <>
      <Header />
      <Button onClick={ handleAllBtn } data-testid="filter-by-all-btn">All</Button>
      <Button onClick={ handleFoodBtn } data-testid="filter-by-food-btn">Food</Button>
      <Button
        onClick={ handleDrinksBtn }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </Button>
      { renderer && renderer.map((item, i) => (
        <CardFavorit key={ i } mealOrDrink={ item } index={ i } />
      ))}
    </>
  );
}
