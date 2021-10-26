import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchRecipeRandomDrink } from '../../services/recipeAPI';

export default function ExploreDrink() {
  const history = useHistory();
  const [randomRecipe, setRandomRecipe] = useState({});
  const [change, setChange] = useState(true);

  async function handleClickRandomRecipe() {
    setChange(!change);
    const id = Object.values(randomRecipe.drinks[0])[0];
    history.push(`/bebidas/${id}`);
  }

  useEffect(() => {
    const func = async () => {
      const fun = await fetchRecipeRandomDrink();
      setRandomRecipe(fun);
    };
    func();
  }, [change]);
  return (
    <div className="explorar-drink-app">
      <Header title="Explorar Bebidas" display="false" />
      <div className="explore-drink">
        <Button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </Button>
        <Button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClickRandomRecipe }
        >
          Me Surpreenda!
        </Button>
      </div>
      <Footer />
    </div>
  );
}
