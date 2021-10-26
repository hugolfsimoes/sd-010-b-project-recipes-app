import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchRecipeRandomFood } from '../../services/recipeAPI';

export default function ExploreFood() {
  const history = useHistory();
  const [randomRecipe, setRandomRecipe] = useState({});
  const [change, setChange] = useState(true);

  async function handleClickRandomRecipe() {
    setChange(!change);
    const id = Object.values(randomRecipe.meals[0])[0];
    history.push(`/comidas/${id}`);
  }

  useEffect(() => {
    const func = async () => {
      const fun = await fetchRecipeRandomFood();
      setRandomRecipe(fun);
    };
    func();
  }, [change]);

  return (
    <div className="explorar-food-app">
      <Header title="Explorar Comidas" display="false" />
      <div className="explore-food">
        <Button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </Button>
        <Button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
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
