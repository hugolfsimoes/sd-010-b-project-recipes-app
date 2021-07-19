import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clipboard from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import '../styles/Done.css';

export default function RecipesMade() {
  const [copy, setCopy] = useState(false);
  const itensDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [DoneRecipes, setDoneRecipes] = useState(itensDone);

  function filterRecipes(option) {
    const filterSelected = !option
      ? itensDone
      : itensDone.filter((recipe) => option === recipe.type);
    setDoneRecipes(filterSelected);
  }

  function copyLinkRecipe(recipe) {
    clipboard(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopy(true);
  }

  // return DoneRecipes.length === 0 ? <div> loading... </div> : (
  return (
    <>
      <header className="header-container">
        <div>
          <Link to="/perfil">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </Link>
        </div>
        <div>
          <h1 data-testid="page-title">Receitas Feitas</h1>
        </div>
      </header>
      <section className="Done-Recipes">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('comida') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('bebida') }
        >
          Drink
        </button>
      </section>
      <main>
        {DoneRecipes.map((item, index) => (
          <>
            <Link
              to={ `/${item.type}s/${item.id}` }
            >
              <img
                id={ index }
                alt={ item.name }
                width="100"
                src={ item.image }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { item.type === 'bebida'
                ? item.alcoholicOrNot : `${item.area} - ${item.category}`}
            </p>
            <Link
              to={ `/${item.type}s/${item.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              {item.name}
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
            <button
              type="button"
              onClick={ () => copyLinkRecipe(item) }
            >
              <img
                src={ shareIcon }
                alt="Share Button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
              {copy && <p>Link copiado!</p>}
            </button>
            { item.tags.length === null ? <p>nada</p> : item.tags.map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
            ))}
          </>
        ))}
      </main>

    </>
  );
}
