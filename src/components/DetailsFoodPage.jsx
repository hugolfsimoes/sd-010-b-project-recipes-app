import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import ContextRecipes from '../context/contextRecipes';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecommendedDrinks from './RecommendedDrinks';
import './DetailsPage.css';
import BtnStartFoodRecipe from './BtnStartFoodRecipe';

function DetailsFoodPage({ match: { params } }) {
  // const [recipesFood, setRecipesFood] = useState([]);
  const [star, setStar] = useState(false);
  const { recipes, setRecipes } = useContext(ContextRecipes);
  const { id } = params;
  useEffect(() => {
    const getRecipes = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((results) => setRecipes(results.meals));
    };
    getRecipes();
  }, [id, setRecipes]);

  if (recipes[0] === undefined) return <h1>Loading...</h1>;
  const listIngredients = Object.entries(recipes[0] || {})
    .filter((recipe) => recipe[0].includes('Ingredient') && recipe[1]);
  const ingredientsFinal = listIngredients.map((valor) => valor[1]);

  const listMeasures = Object.entries(recipes[0] || {})
    .filter((recipe) => recipe[0].includes('Measure') && recipe[1]);
  const measuresFinal = listMeasures.map((valor) => valor[1]);

  const INDEX_NUMBER = 3;
  const urlVideo = recipes[0].strYoutube.split('/');
  urlVideo.splice(urlVideo.indexOf(INDEX_NUMBER), 1);
  const urlVideo2 = recipes[0].strYoutube.split('/');
  const partUrl = urlVideo2[3].split('?');
  const partUrl2 = partUrl[1].split('=');
  partUrl2.shift();
  let fullUrl = '';

  partUrl[0] = 'embed';
  urlVideo.push(partUrl[0]);
  urlVideo.push(partUrl2);
  fullUrl = `${urlVideo[0]}//${urlVideo[2]}/${urlVideo[3]}/${urlVideo[4]}`;

  // Para resolver essa problema do clipboard usei como referência os Links: https://stackoverflow.com/questions/49618618/copy-current-url-to-clipboard; https://blog.erikfigueiredo.com.br/area-de-transferencia-copiar-e-colar-com-javascript-dica-rapida/.

  const link = window.location.href;
  const handleFavorited = () => {
    navigator.clipboard.writeText(link);
    const alerta = document.createElement('p');
    document.querySelector('.section-geral').appendChild(alerta);
    alerta.innerText = 'Link copiado!';
  };

  const changeHeart = () => {
    setStar(!star);
  };

  return (
    <section className="section-geral">
      <img
        src={ recipes[0].strMealThumb }
        alt={ recipes[0].strMeal }
        width="250px"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ recipes[0] && recipes[0].strMeal }</p>
      <button type="button" onClick={ handleFavorited }>
        <img
          src={ shareIcon }
          alt="Share"
          data-testid="share-btn"
        />
      </button>
      <button type="button" onClick={ changeHeart }>
        <img
          src={ star === false ? whiteHeartIcon : blackHeartIcon }
          alt="Share"
          data-testid="favorite-btn"
        />
      </button>
      <p data-testid="recipe-category">{ recipes[0].strCategory }</p>
      <h3>Ingredientes</h3>
      <ul>
        { ingredientsFinal
          .map((ing, i) => ((
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ i }
            >
              { ing }
              {' '}
              -
              { ' ' }
              { measuresFinal.map((mea, ind) => i === ind && (mea)) }
            </li>
          ))) }
      </ul>
      <h3>Instruções</h3>
      <p data-testid="instructions">{ recipes[0].strInstructions }</p>
      <iframe
        width="560"
        height="315"
        src={ fullUrl }
        title="YouTube video player"
        data-testid="video"
      />
      <h3>Recomendadas</h3>
      <RecommendedDrinks />
      <BtnStartFoodRecipe id={ id } />
      {/* <Link to={ `/comidas/${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="button"
        >
          Iniciar Receita
        </button>
      </Link> */}
    </section>);
}

DetailsFoodPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default DetailsFoodPage;
