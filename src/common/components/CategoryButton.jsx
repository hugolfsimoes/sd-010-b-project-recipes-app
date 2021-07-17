import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import RenderButtons from './RenderButtons';

import store from '../../context/store';

const foodDrinkButtons = [{ strCategory: 'Food' }, { strCategory: 'Drink' }];

export default function CategoryButton({ clickCategory, foodOrDrink, setState,
  clickAll, path }) { // Desestruturação de props
  const [minWidth, setMinWidth] = useState(false);
  const [iconActive, setActive] = useState(true);

  const { recipes: { foods, categoriesMeals,
    categoriesDrinks, categoriesLimit } } = useContext(store);

  const renderButtons = () => {
    let newCategories;
    if (path) {
      newCategories = foodDrinkButtons;
    } else {
      newCategories = (foods) ? (
        categoriesMeals.slice(0, categoriesLimit)) : (
        categoriesDrinks.slice(0, categoriesLimit));
    }

    return (
      newCategories.map((category, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ path
            ? `filter-by-${category.strCategory.toLowerCase()}-btn`
            : `${category.strCategory}-category-filter` }
          onClick={ path
            ? (() => foodOrDrink(category.strCategory, path, setState))
            : (() => clickCategory(category)) }
        >
          {category.strCategory}
        </button>
      ))
    );
  };

  const checkWidthScreen = () => {
    const MIN_WIDTH = 576;
    const screenWidth = window.screen.width;

    if (screenWidth >= MIN_WIDTH) {
      setMinWidth(true);
    } else {
      setMinWidth(false);
    }
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA
  useEffect(checkWidthScreen, []);
  window.addEventListener('resize', () => checkWidthScreen());

  // ---------------------------------------------------------------------------------------------
  if (path) {
    return (
      <div className="categoriesBtnsDone">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ clickAll }
          className="all-button"
        >
          All
        </button>
        {renderButtons()}
      </div>
    );
  }
  return (
    <section>
      <div className={ (iconActive) ? 'icon iconActive' : 'icon' }>
        <button
          type="button"
          onClick={ () => setActive(!iconActive) }
          className="hamburguer"
        >
          <div />
        </button>
      </div>
      <div className={ (iconActive || minWidth) ? 'containerBtns' : 'menuClose' }>
        <div
          className={ (iconActive || minWidth) ? (
            'categoriesBtns') : ('menuClose') }
        >
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ clickAll }
          >
            All
          </button>
          {renderButtons()}
        </div>
      </div>
    </section>
  );
}

CategoryButton.propTypes = {
  clickCategory: PropTypes.func,
  clickAll: PropTypes.func.isRequired,
  foodOrDrink: PropTypes.func,
  setState: PropTypes.func,
  path: PropTypes.string,
};

CategoryButton.defaultProps = {
  clickCategory: undefined,
  foodOrDrink: () => console.log('nothing to do!'),
  setState: () => console.log('no state to set'),
  path: '',
};
