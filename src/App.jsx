import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, MainPage, RecipeInProgress, DoneRecipes, Profile  } from './pages';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/comidas" component={ MainPage } />
          <Route exact path="/bebidas" component={ MainPage } />
          <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
          <Route path="/receitas-feitas" component={ DoneRecipes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
