import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useRouteMatch } from 'react-router-dom';
import Card from '../components/Card';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import { fetchAPI } from '../services/apiRequest';

const SIX = 6;

export default function FoodAndDrinkById() {
  const { path } = useRouteMatch();
  const firstKey = path.includes('/comidas') ? 'meals' : 'drinks';
  const domain = path.includes('/comidas') ? 'themealdb' : 'thecocktaildb';
  const recDomain = path.includes('/comidas')
    ? 'thecocktaildb' : 'themealdb';
  const recFirstKey = path.includes('/comidas')
    ? 'drinks' : 'meals';
  const { id } = useParams();

  const [singleContent, setSingleContent] = useState([]);
  const [ingredientsList, setIngridientsList] = useState([]);
  const [recomendations, setRecomentation] = useState([]);

  useEffect(() => {
    async function getRecipeDetails() {
      const URL = `https://www.${domain}.com/api/json/v1/1/lookup.php?i=${id}`;
      const URL_RECOMENDATION = `https://www.${recDomain}.com/api/json/v1/1/search.php?s=`;
      const resolved = await fetchAPI(URL);
      const recResolved = await fetchAPI(URL_RECOMENDATION);

      setSingleContent(resolved[firstKey] || []);

      setRecomentation(recResolved[recFirstKey].filter((_e, index) => index < SIX));

      const list = Object.entries(resolved[firstKey][0]).filter((el) => (
        (el[0].includes('Ingredient')
        || el[0].includes('Measure')) && el[1]) && el[1] !== ' ');

      console.log(list);

      setIngridientsList(list);
    }
    getRecipeDetails().catch(console.log);
  }, [id, domain, firstKey, recDomain, recFirstKey]);

  const imgSrc = path.includes('/comidas') ? 'strMealThumb' : 'strDrinkThumb';
  const title = path.includes('/comidas') ? 'strMeal' : 'strDrink';

  function handleFavorite() {
    // console.log(recomendations);
  }
  if (!singleContent[0]) return <h1>Loading...</h1>;
  return (
    <>
      { singleContent.length > 0
      && (
        <>
          <img
            data-testid="recipe-photo"
            src={ singleContent[0][imgSrc] }
            alt={ singleContent[0][title] }
          />
          <h3 data-testid="recipe-title">{singleContent[0][title]}</h3>
          <Button><img data-testid="share-btn" src={ shareIcon } alt="" /></Button>
          <Button onClick={ handleFavorite }>
            <img data-testid="favorite-btn" src={ blackHeartIcon } alt="" />
          </Button>
          <p data-testid="recipe-category">{singleContent[0].strCategory}</p>
          {ingredientsList.map((el, i) => (
            <p
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {el[1]}
            </p>
          ))}
          <p data-testid="instructions">{singleContent[0].strInstructions}</p>
          <p data-testid="video">{singleContent[0].strYoutube}</p>
        </>
      )}

      { recomendations.map((item, i) => (
        <Card
          key={ i }
          mealOrDrink={ item }
          index={ i }
          testId="recomendation"
        />
      ))}
      <Button data-testid="start-recipe-btn">Iniciar Receita</Button>
    </>
  );
}