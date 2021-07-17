import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SearchDrinks = () => {
  console.log('');
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div className="explore">
        <Link data-testid="explore-by-ingredient" to="/explorar/bebidas/ingredientes">
          Por Ingredientes
        </Link>
        <Link data-testid="explore-surprise" to="/bebidas/178319">
          Me Surpreenda!
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default SearchDrinks;
