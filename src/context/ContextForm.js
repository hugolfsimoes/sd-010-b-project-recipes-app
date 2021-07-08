import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [radio, setRadio] = useState('Nome');
  const [firstMeals, setFirstMeals] = useState([]);
  const [area, setArea] = useState([]);
  const [firstDrinks, setFirstDrinks] = useState([]);
  const [firstFoodIngredients, setFirstFoodIngredients] = useState([]);
  const [firstDrinkIngredients, setFirstDrinkIngredients] = useState([]);
  const [foodPerIngredient, setFoodPerIngredient] = useState([]);
  const [drinkPerIngredient, setDrinkPerIngredient] = useState([]);
  const [changeFood, setChangeFood] = useState(false);
  const [changeDrink, setChangeDrink] = useState(false);

  const object = {
    email,
    setEmail,
    pass,
    setPass,
    inputSearch,
    setInputSearch,
    radio,
    setRadio,
    firstMeals,
    setFirstMeals,
    firstDrinks,
    setFirstDrinks,
    area,
    setArea,
    firstFoodIngredients,
    setFirstFoodIngredients,
    firstDrinkIngredients,
    setFirstDrinkIngredients,
    foodPerIngredient,
    setFoodPerIngredient,
    drinkPerIngredient,
    setDrinkPerIngredient,
    changeFood,
    setChangeFood,
    changeDrink,
    setChangeDrink,
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') === null) {
      const Favorite = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(Favorite));
    }
    if (localStorage.getItem('inProgressRecipes') === null) {
      const inProgressRecipes = {
        meals: {
        },
        cocktails: {
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
    if (localStorage.getItem('user') === null) {
      const mail = { email };
      localStorage.setItem('user', JSON.stringify(mail));
    }
  }, []);

  return (
    <Context.Provider value={ object }>
      { children }
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.Node,
}.isRequired;
