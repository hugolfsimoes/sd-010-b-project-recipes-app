import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  return (
    <div>
      <Header title="Explorar" search={ false } />
      <Link to="/explorar/comidas" data-testid="explore-food">
        Explorar Comidas
      </Link>
      <Link to="/explorar/bebidas" data-testid="explore-drinks">
        Explorar Bebidas
      </Link>
      <Footer />
    </div>
  );
}

export default Explore;
