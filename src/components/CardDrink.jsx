import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';

export default function CardDrink() {
  const { resposeApiLupaDrink } = useContext(RecipesContext);
  const history = useHistory();
  const twelve = 12;
  let arrayDrink = resposeApiLupaDrink;

  if (resposeApiLupaDrink === null || resposeApiLupaDrink === undefined) {
    return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (resposeApiLupaDrink.length > twelve) {
    arrayDrink = resposeApiLupaDrink.filter((_e, index) => index < twelve);
  }
  if (resposeApiLupaDrink.length === 1) {
    const { idDrink } = resposeApiLupaDrink[0];
    return history.push(`/bebidas/${idDrink}`);
  }
  return (
    <main>
      <ul>
        {arrayDrink.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <li key={ idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              width="80px"
              src={ strDrinkThumb }
              alt="imagem da bebida"
              data-testid={ `${index}-card-img` }
            />
            <div data-testid={ `${index}-card-name` }>{ strDrink }</div>
          </li>))}
      </ul>
    </main>
  );
}
