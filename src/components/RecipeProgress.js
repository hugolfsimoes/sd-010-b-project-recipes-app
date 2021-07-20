import PropTypes from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router';
import Button from 'react-bootstrap/Button';
import { changeList,
  copyLink, doneClick, favoriteClick, help } from '../helper/functions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useRecipeProgress from '../helper/useRecipeProgress';
import {
  fetchRecipeIDFood, fetchRecipeIDrinks } from '../services/recipeAPI';

export default function RecipeProgress({ idRecipe, typeRecipe }) {
  const [list, setList] = useState([]);
  const [leng, setLeng] = useState([]);
  const [status, setStatus] = useState(true);
  const [detail, setDetail] = useState({});
  const [show, setShow] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [arrayFavorite] = useState(help(JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  ), []));
  const [objectStart] = useState(help(JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  ), { cocktails: {}, meals: {} }));
  const [arrayDone] = useState(help(JSON.parse(
    localStorage.getItem('doneRecipes'),
  ), []));
  const history = useHistory();
  useRecipeProgress({
    idRecipe,
    typeRecipe,
    fetchRecipeIDFood,
    fetchRecipeIDrinks,
    setLeng,
    setList,
    arrayFavorite,
    setFavorite,
    setDetail,
    detail,
    objectStart,
  });

  return (
    <div className="detail1">
      <img
        className="detail-img"
        alt={ typeRecipe === 'food' ? list.strMeal : list.strDrink }
        src={ typeRecipe === 'food' ? list.strMealThumb : list.strDrinkThumb }
        data-testid="recipe-photo"
      />
      <div className="icones">
        <p
          data-testid="recipe-title"
          className="instruction"
        >
          { typeRecipe === 'food' ? list.strMeal : list.strDrink }

        </p>
        <div className="link">
          <img
            style={ { padding: '10px' } }
            role="presentation"
            onClick={ () => copyLink(copy, setShow, typeRecipe, idRecipe) }
            type="button"
            data-testid="share-btn"
            src={ shareIcon }
            alt="Share Icon"
            width="50px"
            className="start-recipe parts"
          />
          {show && <p>Link copiado!</p>}
        </div>
        <img
          width="30px"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="No Favorite"
          onClick={ () => favoriteClick({
            arrayFavorite, list, favorite, typeRecipe, idRecipe, setFavorite }) }
          type="button"
          role="presentation"
          data-testid="favorite-btn"
        />
      </div>
      <p data-testid="recipe-category" className="instruction">
        { typeRecipe === 'food' ? list.strCategory : list.strAlcoholic }
      </p>
      <p className="instruction" data-testid="instructions">{list.strInstructions}</p>

      <div className="lista-ingredientes">
        <ul className="lista">
          {leng.map((ing, index) => (
            <li
              className="instruction-progress"
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                onChange={ ({ target }) => changeList({ target },
                  { typeRecipe, objectStart, idRecipe, setDetail, detail, setStatus }) }
                type="checkbox"
                checked={ detail[ing] === 'detailClass' }
                value={ ing }
              />
              <label
                htmlFor={ list[ing] }
                className={ detail[ing] }
              >
                {' '}
                {list[ing]}
                -
                {list[`strMeasure${index + 1}`]}
              </label>
            </li>))}
        </ul>
      </div>
      <Button
        type="button"
        data-testid="finish-recipe-btn"
        className="start-recipe parts"
        disabled={ status }
        onClick={ () => doneClick({ arrayDone, list, typeRecipe, idRecipe, history }) }
      >
        Finalizar Receita
      </Button>
    </div>
  );
}

RecipeProgress.propTypes = {
  idRecipe: PropTypes.string,
  typeRecipe: PropTypes.string,
}.isRequired;
