import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { actionFilterList } from '../Redux/actions';
import { fetchRecipeAllDrink,
  fetchRecipeAllFood,
  fetchRecipeFilterDrinks,
  fetchRecipeFilterFood } from '../services/recipeAPI';

function FilterRecipe({ list, dispRecipeFilter, recipeType }) {
  const [object, setObject] = useState(list);
  const [show, setShow] = useState(false);
  const [save, setSave] = useState('categoria');

  // console.log(list, listAll);
  useEffect(() => {
    if (Object.keys(list).length > 0) {
      setShow(true);
    }
    setObject(list);
  }, [list]);

  const resAPI = async (fun) => {
    const func = await fun();
    // console.log(func);
    dispRecipeFilter({
      filterList: func,
    });
  };

  function clickAPI({ target }) {
    // console.log(target.value, save);
    setSave(target.value);

    if (target.value === 'All') {
      if (recipeType === 'food') {
        return resAPI(fetchRecipeAllFood);
      }
      return resAPI(fetchRecipeAllDrink);
    }
    if (target.value === save) {
      if (recipeType === 'food') {
        return resAPI(fetchRecipeAllFood);
      }
      return resAPI(fetchRecipeAllDrink);
    }
    if (recipeType === 'food') {
      return resAPI(() => fetchRecipeFilterFood(target.value));
    }
    return resAPI(() => fetchRecipeFilterDrinks(target.value));
  }

  const type = Object.keys(object)[0];
  const NUMBER = 5;
  // console.log(type);
  return (
    <div className="show-filter">
      Filter
      <Button
        type="button"
        onClick={ clickAPI }
        data-testid="All-category-filter"
        value="All"
      >
        All
      </Button>
      { show
      && object[type].slice(0, NUMBER)
        .map((element, index) => (
          <Button
            onClick={ clickAPI }
            data-testid={ `${element.strCategory}-category-filter` }
            type="button"
            key={ index }
            value={ element.strCategory }
          >
            {element.strCategory}

          </Button>)) }
    </div>
  );
}

FilterRecipe.propTypes = {
  list: PropTypes.shape,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispRecipeFilter: (object) => dispatch(actionFilterList(object)),
});

export default connect(null, mapDispatchToProps)(FilterRecipe);
