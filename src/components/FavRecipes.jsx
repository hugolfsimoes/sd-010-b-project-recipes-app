import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/contextRecipes';
import Header from './Header';
import SBElements from './SBElements';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../App.css';

function FavRecipes({ history }) {
  const { goSearch, setTitle } = useContext(ContextRecipes);
  const [shareOrNot, setshareOrNot] = useState(true);
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  useEffect(() => {
    setTitle('Receitas Favoritas');
  }, [setTitle]);

  const urlToClipBoard = () => {
    if (shareOrNot === true) {
      const url = window.location.href.toString();
      navigator.clipboard.writeText(url);
      setshareOrNot(false);
    }
  };

  return (
    <div>
      <Header history={ history } data-testid="page-title" />
      { goSearch && <SBElements history={ history } /> }
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Fodd</button>
      <button type="button" data-testid="filter-by-drink-btn">Drink</button>
      {favoriteRecipes.map((item, index) => (
        <section key={ item.id }>
          <img src={ item.image } alt=" " data-testid={ `${index}-horizontal-image` } />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {(item.type === 'comida')
              ? `${item.area} - ${item.category}`
              : item.alcoholicOrNot}
          </p>
          <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          <button type="button" onClick={ urlToClipBoard }>
            <img
              src={ shareIcon }
              alt=" "
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <p className={ shareOrNot ? 'share' : 'nada' }>Link copiado!</p>
          <button type="button">
            <img
              src={ blackHeartIcon }
              alt=" "
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
