import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../context';

function RecipeCard({ recipe: { id, name, image }, index }) {
  const { pathMeal, setIdDetail } = useContext(RecipeContext);
  const path = pathMeal ? '/comidas' : '/bebidas';

  return (
    <Link to={ `${path}/${id}` } onClick={ () => setIdDetail(id) }>
      <div data-testid={ `${index}-recipe-card` }>
        <img src={ image } alt={ name } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{name}</p>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
