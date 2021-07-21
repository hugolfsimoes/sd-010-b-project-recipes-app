import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { saveFavoriteRecipe, saveFinished } from '../storage/localStorage';

import { getDataById } from '../services/apiRequest';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import RecipesContext from '../context/RecipesContext';

function handleIngredientsData(list) {
  return list.map((el, i, arr) => (
    (el[0].includes('Ingredient')) && ([`${el[1]
      + arr.filter((elt) => elt[0] === (`strMeasure${i + 1}`))
        .map((result) => (` - ${result[1]}`))}`,
    ]))).filter((fil) => fil);
}

function handleFavoriteBtn(favoritState, setFavoritState, path, content) {
  setFavoritState((prevState) => ({ status: !favoritState.status,
    imagem: prevState.imagem === whiteHeartIcon ? blackHeartIcon : whiteHeartIcon }));
  saveFavoriteRecipe(path, content);
}

function handleFinished(history, path, content) {
  const date = new Date();
  saveFinished(content, path, date);
  history.push('/receitas-feitas');
}

export default function InProgress() {
  const { path } = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();

  const [validateCheckBox, setValidateCheckBox] = useState(0);
  const [nmCheckBox, setNmCheckBox] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [renderer, setRenderer] = useState([]);
  const [ingredientsList, setIngridientsList] = useState([]);
  const [isFavorit, setFavorit] = useState({ status: false, imagem: whiteHeartIcon });
  const [copy, setCopy] = useState(false);

  const { favorites, readFavoritesFromStorage } = useContext(RecipesContext);

  const [domain, firstKey, imgSrc, title] = path.includes('comidas')
    ? ['themealdb', 'meals', 'strMealThumb', 'strMeal']
    : ['thecocktaildb', 'drinks', 'strDrinkThumb', 'strDrink'];

  useEffect(() => {
    getDataById(domain, id).then((res) => {
      setRenderer(res[firstKey]);

      const list = Object.entries(res[firstKey][0]).filter((el) => (
        (el[0].includes('Ingredient')
          || el[0].includes('Measure')) && el[1]) && el[1] !== ' ');

      setIngridientsList(list);
    });
  }, [id, domain, firstKey]);

  useEffect(() => {
    setFavorit({
      status: favorites.find((el) => el.id === id),
      imagem: favorites.find((el) => el.id === id)
        ? blackHeartIcon : whiteHeartIcon });
  }, [favorites, id, readFavoritesFromStorage]);

  const listFormated = handleIngredientsData(ingredientsList);
  useEffect(() => {
    if (validateCheckBox === listFormated.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [listFormated.length, validateCheckBox]);

  function handleCheckBox({ target }) {
    const { name } = target;

    if (nmCheckBox.includes(name)) {
      target.parentNode.className = '';
      setNmCheckBox(nmCheckBox.filter((nm) => nm !== name));
      setValidateCheckBox(validateCheckBox - 1);
    } else {
      target.parentNode.className = 'done';
      setNmCheckBox([...nmCheckBox, name]);
      setValidateCheckBox(validateCheckBox + 1);
    }
  }

  // Source: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
  function handleShare() {
    navigator.clipboard.writeText(window.location.href.replace('/in-progress', ''))
      .then(() => setCopy(true));
  }

  return (
    !renderer[0] ? (<h1>Loading...</h1>)
      : (
        <>
          <img
            data-testid="recipe-photo"
            src={ renderer[0][imgSrc] }
            alt={ renderer[0][title] }
          />

          <p data-testid="recipe-title">{renderer[0][title]}</p>

          <Button onClick={ handleShare }>
            { !copy ? (<img data-testid="share-btn" src={ shareIcon } alt="" />)
              : (<p data-testid="share-btn">Link copiado!</p>)}
          </Button>

          <Button
            onClick={ () => handleFavoriteBtn(isFavorit, setFavorit, path, renderer[0]) }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorit.imagem }
              alt=""
            />
          </Button>

          <p data-testid="recipe-category">{ renderer[0].strCategory }</p>

          {handleIngredientsData(ingredientsList).map((item, i) => (
            <label key={ item } htmlFor={ `${i}-ingredient-step` }>
              <p
                data-testid={ `${i}-ingredient-step` }
              >
                <input
                  id={ `${i}-ingredient-step` }
                  name={ `step-${i + 1}` }
                  type="checkbox"
                  value={ false }
                  className=""
                  onChange={ handleCheckBox }
                />
                {` ${item}`}
              </p>
            </label>
          ))}

          <p data-testid="instructions">{ renderer[0].strInstructions }</p>

          <Button
            data-testid="finish-recipe-btn"
            onClick={ () => handleFinished(history, path, renderer[0]) }
            disabled={ isDisabled }
          >
            Finalizar Receita
          </Button>
        </>)
  );
}
