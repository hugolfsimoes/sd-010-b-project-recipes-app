import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function BtnSearch() {
  const { search,
    radio, idMaster, masterAPI, triggerFood, triggerDrink } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const URL = location.pathname === '/bebidas';

  // const triggerDrink = {
  //   ingredient: (ingredient) => setEndPointMaster({ pointAPI: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`, pointURL: 'drink' }),
  //   name: (name) => setEndPointMaster({ pointAPI: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`, pointURL: 'drink' }),
  //   firstLetter: (letter) => setEndPointMaster({ pointAPI: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`, pointURL: 'drink' }),
  // };

  // const triggerFood = {
  //   ingredient: (ingredient) => setEndPointMaster({ pointAPI: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`, pointURL: 'food' }),
  //   name: (name) => setEndPointMaster({ pointAPI: `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`, pointURL: 'food' }),
  //   firstLetter: (letter) => setEndPointMaster({ pointAPI: `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`, pointURL: 'food' }),
  // };

  const renderVerify = () => {
    if (idMaster) {
      return URL
        ? history.push(`bebidas/${idMaster}`) : history.push(`comidas/${idMaster}`);
    }
    return (
      <div>
        {masterAPI && masterAPI.map((info, index) => (
          <li key={ index } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>
              {info[URL ? 'strDrink' : 'strMeal']}
            </p>
            <img
              className="comidas-bebidas"
              src={ info[URL ? 'strDrinkThumb' : 'strMealThumb'] }
              alt={ info[URL ? 'strDrink' : 'strMeal'] }
              data-testid={ `${index}-card-img` }
            />
          </li>
        ))}
      </div>
    );
  };

  const handleRadio = async () => {
    if (search === '') {
      return (
        global.alert('por favor, digite alguma coisa na busca')
      );
    }
    if (radio === 'firstLetter' && search.length > 1) {
      return (
        global.alert('Sua busca deve conter somente 1 (um) caracter')
      );
    }
    if (radio === 'ingredient') {
      return URL ? triggerDrink.ingredient(search) : triggerFood.ingredient(search);
    }
    if (radio === 'name') {
      return URL ? triggerDrink.name(search) : triggerFood.name(search);
    }
    if (radio === 'firstLetter') {
      return URL ? triggerDrink.firstLetter(search) : triggerFood.firstLetter(search);
    }
  };
  return (
    <>
      <Button
        data-testid="exec-search-btn"
        onClick={ () => handleRadio() }
      >
        Search
      </Button>
      {renderVerify()}
    </>
  );
}
