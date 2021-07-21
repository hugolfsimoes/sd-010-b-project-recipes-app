import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreRecipes';
import FoodIngredients from './pages/Ingredients';
import RecipeDetails from './pages/RecipeDetails';
import NotFound from './pages/NotFound';
import StoredRecipesList from './pages/StoredRecipesList';
import RandomRecipe from './pages/RandomRecipe';

function App() {
  return (
    <div>
      <RecipeProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Recipes } />
          <Route exact path="/bebidas" component={ Recipes } />
          <Route exact path="/comidas/:id" component={ RecipeDetails } />
          <Route exact path="/bebidas/:id" component={ RecipeDetails } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/comidas/:id/in-progress" component={ RecipeDetails } />
          <Route exact path="/bebidas/:id/in-progress" component={ RecipeDetails } />
          <Route exact path="/receitas-feitas" component={ StoredRecipesList } />
          <Route
            exact
            path="/receitas-favoritas"
            render={ () => <StoredRecipesList favorite /> }
          />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreFoods } />
          <Route exact path="/explorar/bebidas" component={ ExploreFoods } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ FoodIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ FoodIngredients }
          />
          <Route exact path="/explorar/comidas/random" component={ RandomRecipe } />
          <Route exact path="/explorar/bebidas/random" component={ RandomRecipe } />
          <Route exact path="/explorar/comidas/area" component={ Recipes } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </RecipeProvider>
    </div>
  );
}

export default App;
