import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Search = () => (
  <div>
    <Header title="Explorar" />
    <div className="explore">
      <Link data-testid="explore-food" to="/explorar/comidas">
        Explorar Comidas
      </Link>

      <Link data-testid="explore-drinks" to="/explorar/bebidas">
        Explorar Bebidas
      </Link>
    </div>
    <Footer />
  </div>
);

export default Search;
