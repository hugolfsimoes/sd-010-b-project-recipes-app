import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context';

function ExploreRecipes() {
  const { pathname } = useLocation();
  const { setSearchOrigin } = useContext(RecipeContext);
  const pathMeal = pathname.includes('comidas');

  return (
    <>
      <Header
        title={ `Explorar ${pathMeal ? 'Comidas' : 'Bebidas'}` }
        search={ false }
      />
      <Link to={ `${pathname}/ingredientes` } data-testid="explore-by-ingredient">
        Por Ingredientes
      </Link>
      {pathMeal && (
        <Link
          to={ `${pathname}/area` }
          data-testid="explore-by-area"
          onClick={ () => setSearchOrigin(true) }
        >
          Por Local de Origem
        </Link>)}
      <Link
        to={ `${pathname}/random` }
        data-testid="explore-surprise"
        // onClick={ () => setIdDetail(recipes[0].idMeal) } // testar se está sendo necessário ainda
      >
        Me Surpreenda!
      </Link>
      <Footer />
    </>
  );
}

export default ExploreRecipes;
