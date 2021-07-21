import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import OriginFilter from '../components/OriginFilter';

function Recipes() {
  const { pathname } = useLocation();
  const { pathMeal, showSearch, searchOrigin,
    setSearchOrigin } = useContext(RecipeContext);

  function headerTitle() {
    if (searchOrigin) {
      return 'Explorar Origem';
    }
    return pathMeal ? 'Comidas' : 'Bebidas';
  }

  useEffect(() => () => setSearchOrigin(false), [pathname]); // função que limpa (willUnmount). Foi necessário para funcionar adequadamente a aplicação.

  return (
    <div>
      <Header title={ headerTitle() } search />
      { showSearch && <SearchBar /> }
      {searchOrigin ? <OriginFilter /> : <CategoryFilter />}
      <RecipesList />
      <Footer />
    </div>
  );
}

export default Recipes;
