import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Explore extends React.Component {
  render() {
    return (
      <section>
        <Header title="Explorar" />
        <section className="explore-cards-section">
          <Link to="/explorar/comidas" className="explore">
            <button type="button" data-testid="explore-food" className="main-cards-div">
              <h3>Explorar Comidas</h3>
              <div className="explore-meal-img" />
              <div className="main-card-background explore-background" />
            </button>
          </Link>
          <Link to="/explorar/bebidas" className="explore">
            <button type="button" data-testid="explore-drinks" className="main-cards-div">
              <h3>Explorar Bebidas</h3>
              <div className="explore-drinks-img" />
              <div className="main-card-background explore-background" />
            </button>
          </Link>
        </section>
        <Footer />
      </section>
    );
  }
}

export default Explore;
