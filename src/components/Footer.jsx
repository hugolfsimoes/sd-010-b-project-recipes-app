import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { drinkIngredients, foodIngredients } from '../redux/actions';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends React.Component {
  constructor() {
    super();
    this.onClickButton = this.onClickButton.bind(this);
  }

  async onClickButton(callback, redirect) {
    const { history } = this.props;
    await callback(null);
    history.push(`/${redirect}`);
  }

  render() {
    const { alterFoodIngredientsKey, alterDrinkIngredientsKey } = this.props;
    return (
      <nav data-testid="footer" className="footer-navBar">
        <button
          type="button"
          onClick={ () => this.onClickButton(alterDrinkIngredientsKey, 'bebidas') }
        >
          <img
            src={ drinkIcon }
            alt="Drink"
            data-testid="drinks-bottom-btn"
            className="footer-icon"
          />
        </button>
        <Link to="/explorar">
          <img
            src={ exploreIcon }
            alt="Explore"
            data-testid="explore-bottom-btn"
            className="footer-icon"
          />
        </Link>
        <button
          type="button"
          onClick={ () => this.onClickButton(alterFoodIngredientsKey, 'comidas') }
        >
          <img
            src={ mealIcon }
            alt="Meal"
            data-testid="food-bottom-btn"
            className="footer-icon"
          />
        </button>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  alterDrinkIngredientsKey: (payload) => dispatch(drinkIngredients(payload)),
  alterFoodIngredientsKey: (payload) => dispatch(foodIngredients(payload)),
});

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  alterDrinkIngredientsKey: PropTypes.func.isRequired,
  alterFoodIngredientsKey: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(withRouter(Footer));
