import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import store, { setFetchOnDone } from '../../context/store';
import drinkIcon from '../../images/drinkIcon.png';
import exploreIcon from '../../images/exploreIcon.png';
import mealIcon from '../../images/mealIcon.png';

export default function Footer() {
  const { setRecipes } = useContext(store);
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/bebidas" onClick={ () => setRecipes(setFetchOnDone(true)) }>
        <img
          type="image"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="bebidas"
        />
      </Link>
      <Link to="/explorar">
        <img
          type="image"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explorar"
        />
      </Link>
      <Link to="/comidas" onClick={ () => setRecipes(setFetchOnDone(true)) }>
        <img
          type="image"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="comidas"
        />
      </Link>
    </footer>
  );
}
