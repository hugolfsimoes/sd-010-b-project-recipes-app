import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';
import Header from './Header';
import SBElements from './SBElements';
import shareIcon from '../images/shareIcon.svg';
import './DetailsPage.css';

function DoneRecipes({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);
  const [itemsFromStorage, setItemsFromStorage] = useState([]);

  useEffect(() => {
    setTitle('Receitas Feitas');
  }, [setTitle]);

  useEffect(() => {
    const setItems = () => {
      const getItemsFromStorage = JSON.parse(localStorage.getItem('doneRecipes'));
      setItemsFromStorage(getItemsFromStorage);
    };
    setItems();
  }, []);

  // let getItemsFromStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  // console.log(getItemsFromStorage, 'HEYYYY aqui getItemsFromStorage');
  const handleFavorited = () => {
    // const newTag = document.createElement('input');
    const link = window.location.href;

    // document.body.appendChild(newTag);
    // newTag.value = link;
    // newTag.select();
    // document.execCommand('copy');
    // document.body.removeChild(newTag);
    navigator.clipboard.writeText(link);
    // alert('Link copiado!');
    const alerta = document.createElement('p');
    document.querySelector('.section-geral').appendChild(alerta);
    alerta.innerText = 'Link copiado!';
  };

  const handleOnlyFoods = () => {
    const getItemsFromStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setItemsFromStorage(getItemsFromStorage);
    const filterFoods = itemsFromStorage.filter((item) => item.type === 'comida');
    setItemsFromStorage(filterFoods);
    console.log(itemsFromStorage);
    // return getItemsFromStorage;
  };
  const handleOnlyDrinks = () => {
    const getItemsFromStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setItemsFromStorage(getItemsFromStorage);
    const filterDrinks = itemsFromStorage.filter((item) => item.type === 'bebida');
    setItemsFromStorage(filterDrinks);
    console.log(itemsFromStorage);
    // return getItemsFromStorage;
  };
  const handleAllRecipes = () => {
    const getItemsFromStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setItemsFromStorage(getItemsFromStorage);
    console.log(itemsFromStorage);
    // return getItemsFromStorage;
  };

  return (
    <section className="section-geral">
      <Header history={ history } data-testid="page-title" />
      { goSearch && <SBElements history={ history } /> }
      <button
        type="button"
        onClick={ handleAllRecipes }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ handleOnlyFoods }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        onClick={ handleOnlyDrinks }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { itemsFromStorage && itemsFromStorage
        .map((item, index) => (item.type === 'bebida'
          ? (
            <div key={ index }>
              <Link to={ `/bebidas/${item.id}` }>
                <img
                  src={ item.image }
                  alt={ item.name }
                  width="100px"
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>{item.alcoholicOrNot}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
              <button type="button" onClick={ handleFavorited }>
                <img
                  src={ shareIcon }
                  alt="Share"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            </div>
          ) : (
            <div key={ index }>
              <Link to={ `/comidas/${item.id}` }>
                <img
                  src={ item.image }
                  alt={ item.name }
                  width="100px"
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${item.area} - ${item.category}`}
              </p>
              <p data-testid={ `${index}-horizontal-top-text` }>{item.alcoholicOrNot}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
              <div className="tags">
                { item.tags && item.tags
                  .map((tag, i) => (
                    <p
                      key={ i }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </p>
                  ))}
              </div>
              <button type="button" onClick={ handleFavorited }>
                <img
                  src={ shareIcon }
                  alt="Share"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            </div>
          )))}
    </section>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default DoneRecipes;
