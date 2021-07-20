import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchAPI from '../services/fetchApi';

class ExploreBeverages extends React.Component {
  constructor() {
    super();
    this.state = {
      randomId: '',
    };
    this.fetchRandom = this.fetchRandom.bind(this);
  }

  componentDidMount() {
    this.fetchRandom();
  }

  async fetchRandom() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const random = await fetchAPI(url);
    const randomId = random.drinks[0].idDrink;
    this.setState({
      randomId,
    });
  }

  render() {
    const { randomId } = this.state;
    const url = `/bebidas/${randomId}`;
    return (
      <section>
        <Header title="Explorar Bebidas" />
        <section className="explore-cards-section">
          <Link to="/explorar/bebidas/ingredientes" className="explore">
            <button
              type="button"
              data-testid="explore-by-ingredient"
              className="main-cards-div explore-drinks"
            >
              <h3>Por Ingredientes</h3>
              <img src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator-usa.com/news/markets/cbd-celery-juice-pea-protein-moringa-sauerkraut-tastewise-talks-trending-ingredients/10198380-1-eng-GB/CBD-celery-juice-pea-protein-moringa-sauerkraut-Tastewise-talks-trending-ingredients_wrbm_large.jpg" alt="Ingredientes" />
              <div className="main-card-background explore-background" />
            </button>
          </Link>
          <Link to={ url } className="explore">
            <button
              type="button"
              data-testid="explore-surprise"
              className="main-cards-div explore-drinks"
            >
              <h3>Me Surpreenda!</h3>
              <img className="drinks-img" src="https://www.familysearch.org/blog/en/wp-content/uploads/sites/2/2020/03/world-cuisine.jpg" alt="origem" />
              <div className="main-card-background explore-background" />
            </button>
          </Link>
        </section>
        <Footer />
      </section>
    );
  }
}

export default ExploreBeverages;
