import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchRecipeIngredientsFood } from '../../services/recipeAPI';

export default function ExploreIngredientsFood() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const func = async () => {
      const fun = await fetchRecipeIngredientsFood();
      const ingredientName = Object.values(fun.meals);
      const NUMBER_OF_INGREDIENTS = 12;
      setIngredients(ingredientName.slice(0, NUMBER_OF_INGREDIENTS));
    };
    func();
  }, []);

  return (
    <div className="explore-ingredients">
      <Header title="Explorar Ingredientes" display="false" />
      <div className="div-cards-ingredients">
        {ingredients.length > 0 && ingredients.map((ingredient, index) => (
          <div
            className="ingrets"
            role="presentation"
            data-testid={ `${index}-ingredient-card` }
            key={ ingredient.idIngredient }
            style={ { border: 'solid black 1px' } }
            onClick={ () => history
              .push({ pathname: '/comidas', ingredient: ingredient.strIngredient }) }
          >
            <img
              data-testid={ `${index}-card-img` }
              width="30px"
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt=""
            />
            <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
