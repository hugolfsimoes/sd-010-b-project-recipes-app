import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import HeaderWithButton from '../../components/HeaderWithButton';
import Menu from '../../components/Menu';
import AppContext from '../../context/AppContext';

export default function RecipesPrincipal() {
  const location = useLocation();
  const URL = location.pathname === '/bebidas';

  // const { category, categoryDrink } = useContext(AppContext);
  const { masterAPI, triggerDrink, triggerFood } = useContext(AppContext);
  const [status, setStatus] = useState('');
  const [categories, setCategories] = useState();

  const getCategories = async () => {
    const limit = 5;
    const data = await fetch(URL ? 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list' : 'https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const resp = await data.json();
    console.log('data', data);
    const result = resp[URL ? 'drinks' : 'meals'];
    console.log('result', result);
    setCategories(result.slice(0, limit));
  };

  useEffect(() => {
    if (URL) {
      triggerDrink.all();
      getCategories();
    } else {
      triggerFood.all();
      getCategories();
    }
  }, []);

  const toggle = (strCategory) => {
    if (!status || status !== strCategory) {
      if (URL) {
        triggerDrink.category(strCategory, 'drink');
      } else {
        triggerFood.category(strCategory, 'food');
      }
      setStatus(strCategory);
    }
    if (status === strCategory) {
      if (URL) {
        triggerDrink.all();
      } else {
        triggerFood.all();
      }
      setStatus('');
    }
  };

  const nameTitle = () => (
    <>
      <HeaderWithButton title="Comidas" />
      {categories && categories.map(({ strCategory }, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => toggle(strCategory) }
        >
          { strCategory }
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => (URL ? triggerDrink.all() : triggerFood.all()) }
      >
        All
      </button>
      {masterAPI && masterAPI.map((info, index) => (
        <Link
          to={ URL ? `bebidas/${info.idDrink}` : `comidas/${info.idMeal}` }
          key={ index }
        >
          <li key={ index } data-testid={ `${index}-recipe-card` }>
            <p
              data-testid={ `${index}-card-name` }
            >
              {info[URL ? 'strDrink' : 'strMeal']}
            </p>
            <img
              src={ info[URL ? 'strDrinkThumb' : 'strMealThumb'] }
              alt={ info[URL ? 'strDrink' : 'strMeal'] }
              data-testid={ `${index}-card-img` }
            />
          </li>
        </Link>
      ))}
    </>
  );
  return (
    <>
      <h1>Tela principal de receitas</h1>
      {nameTitle()}
      <Menu />
    </>
  );
}
