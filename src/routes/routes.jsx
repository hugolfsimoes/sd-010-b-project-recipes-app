import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import Drinks from '../pages/Drinks';
import FoodDetail from '../pages/FoodDetail';
import DrinkDetail from '../pages/DrinkDetail';
import FoodProgress from '../pages/FoodProgress';
import DrinkProgress from '../pages/DrinkProgress';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodIngredients from '../pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from '../pages/ExploreDrinkIngredients';
import ExploreFoodsArea from '../pages/ExploreFoodsArea';
import Profile from '../pages/Profile';
import FinishedRecipes from '../pages/FinishedRecipes';
import FavoritesRecipes from '../pages/FavoritesRecipes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Recipes } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route path="/comidas/:id-da-receita" component={ FoodDetail } />
      <Route path="/bebidas/:id-da-receita" component={ DrinkDetail } />
      <Route path="/comidas/:id-da-receita/in-progress" component={ FoodProgress } />
      <Route path="/bebidas/:id-da-receita/in-progress" component={ DrinkProgress } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/explorar/comidas" component={ ExploreFoods } />
      <Route path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreFoodIngredients } />
      <Route
        exact
        path="/comidas/{id-da-receita}/in-progress"
        component={ FoodProgress }
      />
      <Route
        exact
        path="/bebidas/{id-da-receita}/in-progress"
        component={ DrinkProgress }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinkIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodsArea } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ FinishedRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />
    </Switch>
  );
}

export default Routes;
