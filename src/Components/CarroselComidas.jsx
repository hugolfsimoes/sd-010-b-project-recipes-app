import PropTypes from 'prop-types';
import React from 'react';
import { setList6 } from '../services/services';

function CarroselComidas(props) {
  const { recomendations } = props;
  // console.log(recomendations);
  const itemsRecomendations = setList6(recomendations);
  return (
    <div className="carousel">
        {itemsRecomendations.map((item, index) => (
          <div
            key={ item.idMeal }
            data-testid={ `${index}-recomendation-card` }
            className="content"
          >
            <img src={ item.strMealThumb } alt={ item.strMeal } />
            <h6
              className="legend"
              data-testid={ `${index}-recomendation-title` }
            >
              {item.strMeal}
            </h6>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

CarroselComidas.propTypes = {
  recomendations: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default CarroselComidas;
