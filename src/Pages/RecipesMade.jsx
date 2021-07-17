import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import profileIcon from '../images/profileIcon.svg';

export default function RecipesMade() {
  const itensDone = localStorage.getItem('doneRecipes');

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
      <section className="button-category-favorite-recipes-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Bebidas
        </button>
      </section>
      <main>
        {itensDone.map((item, index) => (
          <>
            <img alt="a" data-testid={ `${index}-horizontal-image` } />
            <p data-testid={ `${index}-horizontal-top-text` }>texto</p>
            <p data-testid={ `${index}-horizontal-name` }>{item.nome}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              compartilhar
            </button>
            <p data-testid={ `${index}-tagName-horizontal-tag` }>{item.tags}</p>
          </>
        ))}
      </main>

      <Footer />
    </>
  );
}
