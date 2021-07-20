import React, { useState } from 'react';
import { Header } from '../components';
import DoneCard from '../components/DoneCard';
import './css/doneRecipes.css';

function DoneRecipes() {
  const [filter, setFilter] = useState('');
  return (
    <div>
      <Header />
      <article id="category-done-buttons">
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('Food') }
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('Drinks') }
        >
          Drinks
        </button>

        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('All') }
        >
          All
        </button>
      </article>
      <DoneCard filter={ filter } />
    </div>
  );
}

export default DoneRecipes;
