import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { recipeById } from '../services/requests';
import { checkRecypeId, checkProgress } from '../services/localStorage';
import { renderIngredients } from '../utils';
import Carousel from '../components/Carousel';
import FavoriteIcon from '../components/FavoriteIcon';

const Drink = ({ match }) => {
  const history = useHistory();
  const {
    params: { id },
  } = match;
  const [drink, setDrink] = useState({});
  const [msgCopy, setMsgCopy] = useState(false);

  useEffect(() => {
    recipeById(id).then(setDrink);
  }, [id, setDrink]);

  const textProgress = checkProgress(id) ? 'Continuar Receita' : 'Iniciar Receita';
  return (
    <div>
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <h3 data-testid="recipe-category">{drink.strAlcoholic}</h3>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
      <ul>
        Ingredientes:
        {renderIngredients(drink)}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <button
        onClick={ () => copy(`http://localhost:3000${history.location.pathname}`).then(() => {
          setMsgCopy(true);
        }) }
        type="button"
        data-testid="share-btn"
      >
        { msgCopy ? 'Link copiado!' : 'Compartilhar' }
      </button>
      <FavoriteIcon recipe={ drink } idTest="favorite-btn" />
      {!checkRecypeId(id) && (
        <button
          className="footer"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`/bebidas/${drink.idDrink}/in-progress`) }
        >
          {textProgress}
        </button>
      )}
      <br />
      <Carousel />
      <Link to="/bebidas"><button type="button">Voltar</button></Link>
      <br />
      <br />
    </div>
  );
};

Drink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Drink;
