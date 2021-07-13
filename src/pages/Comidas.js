import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';
import useFetchInicialFoods from '../Hooks/fetchInicialFoods';
import FilterBar from '../components/FilterBar';

function Comidas() {
  const DOZE = 12;
  Comidas.displayName = 'Comidas';
  const { data } = useContext(ContextRecipes);
  useFetchInicialFoods();

  const dataAux = { ...data };
  const { meals } = dataAux;
  // console.log(meals);

  const loadingFunc = () => (
    <div>
      <Spinner animation="border" size="sm" />
    </div>
  );
  const dataRender = () => (
    <div className="container-fluid d-flex flex-wrap justify-content-around">
      { meals && meals.slice(0, DOZE).map((food, index) => (
        <Link to={ `/comidas/${food.idMeal}` } key={ food.idMeal }>
          <div className="card m-1" data-testid={ `${index}-recipe-card` } key={ food.idMeal }>
            <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
            <img
              className=" m-1 p-1"
              width="200px"
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ food.strMeal }
            />
          </div>
        </Link>
      ))}
    </div>);

  return (
    <div>
      <Header title={ Comidas.displayName } />
      {/* <h1>Comidas</h1> */}
      <FilterBar title={ Comidas.displayName } />
      <div>
        {!data.meals ? loadingFunc() : dataRender()}
      </div>
      <Footer />
    </div>
  );
}

export default Comidas;