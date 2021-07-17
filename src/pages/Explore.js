import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/default.css';

export default function Explore() {
  return (
    <>
      <Header />
      <section className="container-buttons-default">
        <Link to="/explorar/comidas">
          <Button
            className="button-default"
            data-testid="explore-food"
          >
            Explorar Comidas
          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button
            className="button-default"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </Button>
        </Link>
      </section>
      <Footer />
    </>
  );
}
