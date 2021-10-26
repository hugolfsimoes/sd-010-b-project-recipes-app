import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import Button from 'react-bootstrap/Button';
import { redirectPage, copyLink, favoriteClick, help } from '../helper/functions';
import useRecipeDetail from '../helper/useRecipeDetail';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { fetchRecipeAllDrink,
  fetchRecipeAllFood,
  fetchRecipeIDFood, fetchRecipeIDrinks } from '../services/recipeAPI';

function RecipeDetail({ idRecipe, typeRecipe }) {
  const [list, setList] = useState([]);
  const [leng, setLeng] = useState([]);
  const [reco, setReco] = useState([]);
  const [show, setShow] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [objectStart] = useState(help(JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  ), { cocktails: {}, meals: {} }));
  const [arrayFavorite] = useState(help(JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  ), []));
  const [arrayDone] = useState(help(JSON.parse(
    localStorage.getItem('doneRecipes'),
  ), []));
  const [button, setButton] = useState('Iniciar Receita');
  const history = useHistory();
  useRecipeDetail({
    idRecipe,
    typeRecipe,
    fetchRecipeIDFood,
    fetchRecipeIDrinks,
    fetchRecipeAllFood,
    fetchRecipeAllDrink,
    setLeng,
    setList,
    setReco,
    setButton,
    objectStart,
    arrayFavorite,
    setFavorite,
  });

  const arrayButton = arrayDone.filter((element) => element.id === idRecipe);
  console.log(arrayButton);
  return (
    <div className="detail">
      <img
        width="100%"
        alt={ typeRecipe === 'food' ? list.strMeal : list.strDrink }
        src={ typeRecipe === 'food' ? list.strMealThumb : list.strDrinkThumb }
        data-testid="recipe-photo"
      />

      <div className="icones">
        <p
          className="title-repice"
          data-testid="recipe-title"
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
          />
          {show && <p>Link copiado!</p>}
        </div>
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="No Favorite"
          width="30px"
          onClick={ () => favoriteClick({
            arrayFavorite, list, favorite, typeRecipe, idRecipe, setFavorite }) }
          type="button"
          role="presentation"
          data-testid="favorite-btn"
        />
      </div>
      <p
        className="instruction"
        data-testid="recipe-category"
      >
        { typeRecipe === 'food' ? `Category: ${list.strCategory}`
          : `Category: ${list.strAlcoholic}` }
      </p>
      <p
        className="instruction parts"
        data-testid="instructions"
      >
        {list.strInstructions}
      </p>
      <p className="ingredients-p">Ingredients:</p>
      <ul className="ingredients-details parts">
        {leng.map((ing, index) => (
          <li
            className="instruction"
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {list[ing]}
            -
            {list[`strMeasure${index + 1}`]}
          </li>))}
      </ul>
      { typeRecipe === 'food'
      && <iframe
        className="video parts"
        data-testid="video"
        width="260"
        height="200"
        src={ list.length === 0 ? `https://www.youtube.com/embed/${list.strYoutube}` : `https://www.youtube.com/embed/${list.strYoutube.split('v=')[1]}` }
        title="YouTube video player"
        frameBorder="0"
        allow="
        accelerometer;
        autoplay;
        clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />}

      <p className="recomendacoes">Recomendações</p>
      <div className="recipe-list parts recomendacoes-list">

        { reco.map((item, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            className="recipe-card"
            key={ index }
            role="presentation"
          >
            <img
              className="filhinho"
              src={ typeRecipe !== 'food'
                ? item.strMealThumb : item.strDrinkThumb }
              data-testid={ `${index}-recomendation-img` }
              alt={ typeRecipe !== 'food' ? item.strMeal : item.strDrink }
              width="20%"
            />
            <p data-testid={ `${index}-recomendation-title` }>
              { typeRecipe !== 'food' ? item.strMeal : item.strDrink }
            </p>
          </div>))}
      </div>
      { arrayButton.length === 0
      && (
        <Button
          onClick={ () => redirectPage(history, idRecipe, typeRecipe) }
          className="start-recipe parts"
          type="button"
          value={ button }
          data-testid="start-recipe-btn"
        >
          {button}
        </Button>)}

    </div>

  );
}

RecipeDetail.propTypes = {
  idRecipe: PropTypes.string,
  typeRecipe: PropTypes.string,
}.isRequired;

export default RecipeDetail;
