import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import List from '../components/List';
import { requestByDetailsDrink } from '../services/api';
import Icons from '../components/Icons';
import '../styles/DrinkAndFoodProcess(page).css';

const returnArrayOfIngredients = (object) => {
  const maxIngredients = 15;
  const arrayOfIngredients = [];
  for (let i = 1; i <= maxIngredients; i += 1) {
    const ingredientToPush = `strIngredient${i}`;
    if (object[ingredientToPush] !== null && object[ingredientToPush] !== '') {
      arrayOfIngredients.push(object[ingredientToPush]);
    }
  }
  return arrayOfIngredients;
};

function DrinkProcess() {
  const params = useParams();
  const [drink, setDrink] = useState([]);
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = `${dia}/${mes}/${ano}`;
  const { id: drinkId } = useParams();

  function doneStructure() {
    if (drink[0] !== undefined) {
      const
        { idDrink,
          strArea,
          id,
          strCategory,
          strDrink,
          strDrinkThumb,
          strTags, strAlcoholic } = drink[0];

      const doneElement = {
        id: idDrink || id,
        type: 'bebida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: dataAtual,
        tags: strTags === null ? null : strTags.split(','),
      };
      return doneElement;
    }
  }

  function returnIngredientsUsed() {
    const inLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inLocalStorage) return inLocalStorage.cocktails[drinkId];
    return [];
  }

  const [ingredientsUsed, setIngredientsUsed] = useState(returnIngredientsUsed());

  function updateIngredientsUsed() {
    setIngredientsUsed(returnIngredientsUsed());
  }

  function processDone(changeIcon) {
    let done = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneElement = doneStructure();
    if (changeIcon) {
      done = [...done, doneElement];
      localStorage.setItem('doneRecipes', JSON.stringify(done));
    }
  }

  useEffect(() => {
    const request = async () => {
      const result = await requestByDetailsDrink(params.id);
      setDrink(result.drinks);
    };
    request();
  }, [params.id]);
  return (
    drink && (
      drink.map((
        { idDrink, strDrink, strInstructions,
          strDrinkThumb, strAlcoholic, ...rest },
        index,
      ) => {
        const drinks = rest;
        const arrayOfIngredients = returnArrayOfIngredients(drinks);
        return (
          <div className="food-progress-main-div" key={ index }>
            <div className="progress-align">
              <img
                src={ strDrinkThumb }
                className="progress-img"
                alt={ strDrink }
                data-testid="recipe-photo"
              />
              <section className="progressTitle-container">
                <div>
                  <h1
                    className="progress-title"
                    data-testid="recipe-title"
                  >
                    { strDrink }
                  </h1>
                </div>
                <Icons code={ drink[0] } />
              </section>
              <Badge variant="info" data-testid="recipe-category">{strAlcoholic}</Badge>
              <List
                ingredientsUsed={ ingredientsUsed }
                updateIngredientsUsed={ updateIngredientsUsed }
                idMeal={ drinkId }
                drinks={ drinks }
              />
              <h2 className="section-title">Instructions</h2>
              <p
                className="progress-instructions"
                data-testid="instructions"
              >
                { strInstructions }
              </p>
            </div>
            <Link to="/receitas-feitas">
              <Button
                variant="info"
                type="button"
                onClick={ processDone }
                className="progress-startRecipeBtn"
                data-testid="finish-recipe-btn"
                disabled={ arrayOfIngredients.length !== ingredientsUsed.length }
              >
                Finalizar Receita
              </Button>
            </Link>
          </div>
        );
      }))
  );
}

export default DrinkProcess;
