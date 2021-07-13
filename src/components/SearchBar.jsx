import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AppContext from '../ContextApi/Context';
import {
  apiIngredienteFood,
  apiNomeFood,
  apiPrimeiraLetraFood,
  apiIngredienteDrinks,
  apiNomeDrinks,
  apiPrimeiraLetraDrinks,
} from '../RequisiçõesAPI/searchBar/RequestSearchBar';

function SearchBar() {
  const [searchBar, setSearchBar] = useState('');
  const [inputSearchBar, setInputSearchBar] = useState('');

  const { listOfContext: { setFoodAndDrinkList } } = useContext(AppContext);

  const handlingFilterReference = (value) => {
    setSearchBar(value);
  };

  const location = useLocation();
  const { pathname } = location;

  const history = useHistory();

  const ingredienteFood = async (api, foodOrDrink, idMealOrDrink) => {
    if (searchBar === 'primeiraLetra' && inputSearchBar.length > 1) {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const apiResults = await api(inputSearchBar);
    const resultSize = apiResults.length;
    if (resultSize > 1) {
      setFoodAndDrinkList(apiResults);
    } else if (resultSize === 1) {
      history.push(`/${foodOrDrink}/${apiResults[0][idMealOrDrink]}`);
    } else {
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const parameters = searchBar + pathname;

  const searchBarMealsDrinks = {
    'ingrediente/comidas':
      () => ingredienteFood(apiIngredienteFood, 'comidas', 'idMeal'),
    'nome/comidas':
      () => ingredienteFood(apiNomeFood, 'comidas', 'idMeal'),
    'primeiraLetra/comidas':
      () => ingredienteFood(apiPrimeiraLetraFood, 'comidas', 'idMeal'),
    'ingrediente/bebidas':
      () => ingredienteFood(apiIngredienteDrinks, 'bebidas', 'idDrink'),
    'nome/bebidas':
      () => ingredienteFood(apiNomeDrinks, 'bebidas', 'idDrink'),
    'primeiraLetra/bebidas':
      () => ingredienteFood(apiPrimeiraLetraDrinks, 'bebidas', 'idDrink'),
  };

  // const feachSearchBar = async () => {
  //   const parameters = searchBar + pathname;
  //   let apiResults = [];
  //   let resultSize = 0;
  //   switch (parameters) {
  //   case 'ingrediente/comidas':
  //     apiResults = await apiIngredienteFood(inputSearchBar);
  //     resultSize = apiResults.length;
  //     if (resultSize > 1) {
  //       setFoodAndDrinkList(apiResults);
  //     } else if (resultSize === 1) {
  //       history.push(`/comidas/${apiResults[0].idMeal}`);
  //     } else {
  //       global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  //     }
  //     break;
  //   case 'nome/comidas':
  //     apiResults = await apiNomeFood(inputSearchBar);
  //     resultSize = apiResults.length;
  //     if (resultSize > 1) {
  //       setFoodAndDrinkList(apiResults);
  //     } else if (resultSize === 1) {
  //       history.push(`/comidas/${apiResults[0].idMeal}`);
  //     } else {
  //       global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  //     }
  //     break;
  //   case 'primeiraLetra/comidas':
  //     if (inputSearchBar.length > 1) {
  //       return global.alert('Sua busca deve conter somente 1 (um) caracter');
  //     }
  //     apiResults = await apiPrimeiraLetraFood(inputSearchBar);
  //     resultSize = apiResults.length;
  //     if (resultSize > 1) {
  //       setFoodAndDrinkList(apiResults);
  //     } else if (resultSize === 1) {
  //       history.push(`/comidas/${apiResults[0].idMeal}`);
  //     } else {
  //       global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  //     }
  //     break;
  //   case 'ingrediente/bebidas':
  //     apiResults = await apiIngredienteDrinks(inputSearchBar);
  //     console.log(apiResults);
  //     resultSize = apiResults.length;
  //     if (resultSize > 1) {
  //       setFoodAndDrinkList(apiResults);
  //     } else if (resultSize === 1) {
  //       history.push(`/bebidas/${apiResults[0].idDrink}`);
  //     } else {
  //       global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  //     }
  //     break;
  //   case 'nome/bebidas':
  //     apiResults = await apiNomeDrinks(inputSearchBar);
  //     resultSize = apiResults.length;
  //     if (resultSize > 1) {
  //       setFoodAndDrinkList(apiResults);
  //     } else if (resultSize === 1) {
  //       history.push(`/bebidas/${apiResults[0].idDrink}`);
  //     } else {
  //       global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  //     }
  //     break;
  //   case 'primeiraLetra/bebidas':
  //     if (inputSearchBar.length > 1) {
  //       return global.alert('Sua busca deve conter somente 1 (um) caracter');
  //     }
  //     apiResults = await apiPrimeiraLetraDrinks(inputSearchBar);
  //     resultSize = apiResults.length;
  //     if (resultSize > 1) {
  //       setFoodAndDrinkList(apiResults);
  //     } else if (resultSize === 1) {
  //       history.push(`/bebidas/${apiResults[0].idDrink}`);
  //     } else {
  //       global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  //     }
  //     break;
  //   default:
  //     console.log('default');
  //   }
  // };

  return (
    <form>
      <label htmlFor="searchInput">
        <input
          data-testid="search-input"
          id="searchInput"
          type="text"
          value={ inputSearchBar }
          onChange={ ({ target: { value } }) => setInputSearchBar(value) }
        />
      </label>
      <label htmlFor="ingredientSearchRadio">
        <input
          id="ingredientSearchRadio"
          data-testid="ingredient-search-radio"
          type="radio"
          name="searchBar"
          value="ingrediente"
          onChange={ ({ target: { value } }) => handlingFilterReference(value) }
        />
        Ingrediente
      </label>
      <label htmlFor="nameSearchRadio">
        <input
          id="nameSearchRadio"
          data-testid="name-search-radio"
          type="radio"
          name="searchBar"
          value="nome"
          onChange={ ({ target: { value } }) => handlingFilterReference(value) }
        />
        Nome
      </label>
      <label htmlFor="firstLetterSearchRadio">
        <input
          id="firstLetterSearchRadio"
          data-testid="first-letter-search-radio"
          type="radio"
          name="searchBar"
          value="primeiraLetra"
          onChange={ ({ target: { value } }) => handlingFilterReference(value) }
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => searchBarMealsDrinks[parameters]() }
      >
        buscar
      </button>
    </form>
  );
}

export default SearchBar;

// const obj1 = {
//   'comidas': () => api1(inputText),
//   'comidas/nome': () => buscarNaAPiPorNome(inputText),
// };

// obj1['comidas']();

// https://www.youtube.com/watch?v=Lf3ZV0UsnEo
