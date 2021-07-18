import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchAPI from '../services/fetchApi';

class ExploreFood extends React.Component {
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
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const random = await fetchAPI(url);
    const randomId = random.meals[0].idMeal;
    this.setState({
      randomId,
    });
  }

  render() {
    const { randomId } = this.state;
    const url = `/comidas/${randomId}`;
    return (
      <section>
        <Header title="Explorar Comidas" />
        <section className="explore-cards-section">
          <Link to="/explorar/comidas/ingredientes" className="explore-food">
            <button
              type="button"
              data-testid="explore-by-ingredient"
              className="main-cards-div"
            >
              <h3>Por Ingredientes</h3>
              <img src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator-usa.com/news/markets/cbd-celery-juice-pea-protein-moringa-sauerkraut-tastewise-talks-trending-ingredients/10198380-1-eng-GB/CBD-celery-juice-pea-protein-moringa-sauerkraut-Tastewise-talks-trending-ingredients_wrbm_large.jpg" alt="Ingredientes" />
              <div className="main-card-background" />
            </button>
          </Link>
          <Link to="/explorar/comidas/area" className="explore-food">
            <button
              type="button"
              data-testid="explore-by-area"
              className="main-cards-div"
            >
              <h3>Por Local de Origem</h3>
              <img className="drinks-img" src="https://www.familysearch.org/blog/en/wp-content/uploads/sites/2/2020/03/world-cuisine.jpg" alt="origem" />
              <div className="main-card-background" />
            </button>
          </Link>
          <Link to={ url } className="explore-food">
            <button
              type="button"
              data-testid="explore-surprise"
              className="main-cards-div"
            >
              <h3>Me Surpreenda!</h3>
              <img alt="aleatório" src="https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/eurovison_takeaway_roulette.jpg?itok=fGS7x7iY" />
              <div className="main-card-background" />
            </button>
          </Link>
        </section>
        <Footer />
      </section>
    );
  }
}

export default ExploreFood;
