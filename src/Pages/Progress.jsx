/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DetailsProgress from '../Components/DetailsProgress';
import { GetRecipesDone } from '../redux/actions';
import DrinkApi from '../services/BeverageRecipesAPI';
import MealAPI from '../services/MealRecipesAPI';
import { setDoneRecipes } from '../services/services';
import Footer from '../Components/Footer';

function Progress(props) {
  const { match: { params: { id } } } = props;
  const { setDrinkDone, checked } = props;
  const strType = window.location.href.includes('comidas') ? 'Meal' : 'Drink';
  const [disabled, setDisabled] = React.useState(false);

  const API = window.location.href.includes('comidas')
    ? MealAPI.getFoodById : DrinkApi.getDrinkById;

  const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const doneId = Object.keys(cocktails);

  useEffect(() => {
    setDrinkDone(doneId);
  }, []);

  return (
    <>
      <DetailsProgress
        id={ id }
        fetchAPI={ API }
        type={ strType }
        setDisabled={ setDisabled }
      />
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => { setDoneRecipes(checked, 'Drinks'); } }
          disabled={ disabled }
        >
          Finalizar receita
        </button>
      </Link>
      <Footer />
    </>
  );
}

Progress.propTypes = PropTypes.shape({}).isRequired;

const mapStateToProps = (state) => ({
  item: state.details.item,
  checked: state.done.[0],
  redirect: state.details.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  setDrinkDone: (value) => dispatch(GetRecipesDone(value, DrinkApi.getDrinkById)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
