import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';

function Ingredients() {
  return (
    <div>
      <Header title="Explorar Ingredientes" search={ false } />
      <IngredientCard />
      <Footer />
    </div>
  );
}

export default Ingredients;
