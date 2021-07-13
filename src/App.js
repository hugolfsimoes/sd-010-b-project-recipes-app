import React from 'react';
import { Route, Switch, useLocation } from 'react-router';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreMeals from './pages/ExploreMeals';
import ExploreDrinks from './pages/ExploreDrinks';
import MealsIngredients from './pages/MealsIngredients';
import ExploreByArea from './pages/ExploreByArea';
import DrinksIngredients from './pages/DrinksIngredients';
import MealsDetails from './pages/MealsDetails';
import DrinksDetails from './pages/DrinksDetails';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DrinksRecipes from './pages/DrinksRecipes';
import MealsRecipes from './pages/MealsRecipes';
import NotFound from './pages/NotFound';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import RecipesProvider from './context/RecipesProvider';

import {
  allowedHeaderPaths,
  allowedFooterPaths,
} from './services/allowanceToRender';

function App() {
  const location = useLocation();

  const verifyAllowanceToRenderHeader = () => {
    const shouldRenderHeader = allowedHeaderPaths.some(
      (element) => element === location.pathname,
    );
    return shouldRenderHeader ? <Header /> : null;
  };

  const verifyAllowanceToRenderFooter = () => {
    const shouldRenderFooter = allowedFooterPaths.some(
      (element) => element === location.pathname,
    );
    return shouldRenderFooter ? <Footer /> : null;
  };

  return (
    <RecipesProvider>
      { verifyAllowanceToRenderHeader() }
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/comidas" component={ MealsRecipes } />
        <Route exact path="/bebidas" component={ DrinksRecipes } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreMeals } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ MealsIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ DrinksIngredients }
        />
        <Route exact path="/comidas/:id" component={ MealsDetails } />
        <Route exact path="/bebidas/:id" component={ DrinksDetails } />
        <Route component={ NotFound } />
      </Switch>
      { verifyAllowanceToRenderFooter() }
    </RecipesProvider>
  );
}

export default App;
