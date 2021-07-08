import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeProvider from './context/RecipeProvider';
import RecipeDetailProvider from './context/RecipeDetailProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodIngredients from './pages/FoodIngredients';
import DrinkIngredients from './pages/DrinkIngredients';
import FoodOrigin from './pages/FoodOrigin';
import DetailMeal from './pages/DetailMeal';
import DetailDrink from './pages/DetailDrink';
import InProgressMeal from './pages/InProgressMeal';
import InProgressDrink from './pages/InProgressDrink';
import NotFound from './pages/NotFound';
import StoredRecipesList from './pages/StoredRecipesList';

const SEARCH_GENERAL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const SEARCH_GENERAL_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const SEARCH_BY_CATEGORY_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const SEARCH_BY_CATEGORY_MEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

const urlDrink = {
  SEARCH_GENERAL: SEARCH_GENERAL_DRINK,
  SEARCH_BY_CATEGORY: SEARCH_BY_CATEGORY_DRINK,
};

const urlMeal = {
  SEARCH_GENERAL: SEARCH_GENERAL_MEAL,
  SEARCH_BY_CATEGORY: SEARCH_BY_CATEGORY_MEAL,
};

function App() {
  return (
    <div>
      <RecipeProvider>
        <RecipeDetailProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            {/* <Route exact path="/comidas" component={ Food } /> */}
            <Route
              exact
              path="/comidas"
              render={ () => <Recipes urlRecipe={ urlMeal } /> }
            />
            <Route
              exact
              path="/bebidas"
              render={ () => <Recipes urlRecipe={ urlDrink } /> }
            />
            {/* <Route exact path="/bebidas" component={ Drink } /> */}
            <Route exact path="/comidas/:id" component={ DetailMeal } />
            <Route exact path="/bebidas/:id" component={ DetailDrink } />
            <Route exact path="/perfil" component={ Profile } />
            <Route exact path="/comidas/:id/in-progress" component={ InProgressMeal } />
            <Route exact path="/bebidas/:id/in-progress" component={ InProgressDrink } />
            <Route exact path="/receitas-feitas" component={ StoredRecipesList } />
            <Route
              exact
              path="/receitas-favoritas"
              render={ () => <StoredRecipesList favorite /> }
            />
            <Route exact path="/explorar" component={ Explore } />
            <Route exact path="/explorar/comidas" component={ ExploreFoods } />
            <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ FoodIngredients }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ DrinkIngredients }
            />
            <Route exact path="/explorar/comidas/area" component={ FoodOrigin } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </RecipeDetailProvider>
      </RecipeProvider>
    </div>
  );
}

export default App;
