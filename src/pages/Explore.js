import React from 'react';
import { useHistory } from 'react-router';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();
  return (
    <div className="explorar-app">
      <Header title="Explorar" display="false" />
      <div className="explore">
        <Button
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </Button>
        <Button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </Button>
      </div>
      <Footer />
    </div>
  );
}
