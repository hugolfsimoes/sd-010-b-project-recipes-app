import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContextRecipes from '../context/contextRecipes';
import Header from './Header';
import SBElements from './SBElements';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './DetailsPage.css';
import '../App.css';

function FavRecipes({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);
  const getAllFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoriteRecipes, setfavoriteRecipes] = useState(getAllFavoriteRecipes);
  const [buttonSelected, setbuttonSelected] = useState('All');
  const [buttontoggle, setbuttontoggle] = useState(true);
  useEffect(() => {
    setTitle('Receitas Favoritas');
  }, [setTitle]);

  const handleShare = (type, id) => {
    let link = '';
    if (type === 'comida') {
      link = `http://localhost:3000/comidas/${id}`;
    } else {
      link = `http://localhost:3000/bebidas/${id}`;
    }
    navigator.clipboard.writeText(link);
    const alerta = document.createElement('p');
    document.querySelector('.section-geral').appendChild(alerta);
    alerta.innerText = 'Link copiado!';
  };

  const categoryButton = [
    { strCategory: 'Food', dataTestid: 'food' },
    { strCategory: 'Drink', dataTestid: 'drink' },
    { strCategory: 'All', dataTestid: 'all' },
  ];
  const handlefilter = (strCategory) => {
    if (strCategory === 'All') {
      return setfavoriteRecipes(getAllFavoriteRecipes);
    }
    if (buttontoggle === false || strCategory !== buttonSelected) {
      if (strCategory === 'Food') {
        const filtered = favoriteRecipes.filter((recipe) => recipe.type === 'comida');
        setfavoriteRecipes(filtered);
        setbuttonSelected(strCategory);
        setbuttontoggle(true);
      } else if (strCategory === 'Drink') {
        const filtered = favoriteRecipes.filter((recipe) => recipe.type === 'bebida');
        setfavoriteRecipes(filtered);
        setbuttonSelected(strCategory);
        setbuttontoggle(true);
      }
    }
  };

  return (
    <div className="section-geral">
      <Header history={ history } data-testid="page-title" />
      { goSearch && <SBElements history={ history } /> }
      {categoryButton
        .map(({ strCategory, dataTestid }, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `filter-by-${dataTestid}-btn` }
            onClick={ () => handlefilter(strCategory) }
          >
            {strCategory}
          </button>))}
      {favoriteRecipes && favoriteRecipes.map((item, index) => (
        <section key={ item.id }>
          <Link
            to={ (item.type === 'comida')
              ? `/comidas/${item.id}`
              : `/bebidas/${item.id}` }
          >
            <img
              src={ item.image }
              alt={ item.name }
              data-testid={ `${index}-horizontal-image` }
              width="100px"
            />
            <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {(item.type === 'comida')
              ? `${item.area} - ${item.category}`
              : item.alcoholicOrNot}
          </p>
          <button type="button" onClick={ () => handleShare(item.type, item.id) }>
            <img
              src={ shareIcon }
              alt={ item.name }
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <button type="button">
            <img
              src={ blackHeartIcon }
              alt={ item.name }
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </section>))}

    </div>
  );
}

FavRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};

export default FavRecipes;
