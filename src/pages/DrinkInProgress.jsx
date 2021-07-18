import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card, CardColumns } from 'react-bootstrap';
import loopIngredientsAndMeasure from '../components/loopIngredientsAndMeasure';
import Context from '../context/Context';
import DecentFooter from '../components/DecentFooter';
import { copyLinkInProgress } from '../services/functions';
import shareIcon from '../images/shareIcon.svg';
import { verifyFavorite, settingFavorite,
  disableFinishRecipeButton, finishRecipe } from '../services/manageLocalStorage';

export default function DrinkInProgress({ match, history, match: { params: { id } } }) {
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [check, setCheck] = useState();
  const {
    details,
    detailsSyncSetState,
    generateIngredientsAndMeasure,
  } = useContext(Context);

  useEffect(() => {
    detailsSyncSetState(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  }, []);

  if (details.drinks && id === details.drinks[0].idDrink) {
    const IngredientsAndMeasures = generateIngredientsAndMeasure(details.drinks[0]);
    const drinkArray = Object.keys(IngredientsAndMeasures.ingredient);

    if (!check) {
      const cssObject = {};
      drinkArray.forEach((_a, index) => { cssObject[index] = false; });
      setCheck(cssObject);
    }

    const {
      strDrinkThumb,
      strDrink,
      strInstructions,
      strCategory,
    } = details.drinks[0];

    return (
      <main>
        <CardColumns>
          <Card>
            <Card.Img
              variant="top"
              src={ strDrinkThumb }
              alt="Drink"
              width="200px"
              data-testid="recipe-photo"
            />
            <Card.Body>
              <Card.Title data-testid="recipe-title">
                {strDrink}
              </Card.Title>
            </Card.Body>
          </Card>
        </CardColumns>
        {/* <img data-testid="recipe-photo" src={ strDrinkThumb } alt="Drink" width="200px" />
        <h1 data-testid="recipe-title">{strDrink}</h1> */}
        <section className="share-and-fav">
          <Button
            variant="outline-warning"
            type="button"
            data-testid="share-btn"
            onClick={ () => setIsCopied(copyLinkInProgress(match, isCopied)) }
          >
            <img src={ shareIcon } alt="Share" />
          </Button>
          {isCopied ? <p>Link copiado!</p> : null }
          <Button
            variant="outline-danger"
            type="button"
            onClick={ () => setRefresh(settingFavorite(details, id, refresh)) }
          >
            <img
              alt="Favorite"
              src={ verifyFavorite(id) }
              data-testid="favorite-btn"
            />
          </Button>
        </section>
        <h3 className="category" data-testid="recipe-category">{strCategory}</h3>
        <h5 className="instructions" data-testid="instructions">{strInstructions}</h5>
        {loopIngredientsAndMeasure(drinkArray,
          IngredientsAndMeasures,
          id,
          [refresh, setRefresh])}
        <Button
          variant="dark"
          onClick={ () => finishRecipe(id, details.drinks, history) }
          disabled={ disableFinishRecipeButton(id) }
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </Button>
        <DecentFooter />
      </main>
    );
  }
  return (
    <p>Loading...</p>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape(), history: PropTypes.shape() }.isRequired;