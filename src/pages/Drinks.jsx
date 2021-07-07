import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Categories, Card, Footer } from '../components';
import { DrinksContext } from '../context/DrinksProvider';

const Drinks = () => {
  const { drinks, categories, setFilterCategory } = useContext(DrinksContext);

  return (
    <div>

      <Header name="Bebidas" search db="drinks" />

      <Categories
        categories={ categories }
        onClick={ setFilterCategory }
      />
      {drinks.length === 1 && <Redirect to={ `bebidas/${drinks[0].idDrink}` } />}
      {drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        <Card
          id={ idDrink }
          key={ idDrink }
          title={ strDrink }
          img={ strDrinkThumb }
          index={ index }
          type="bebidas"
        />
      ))}
      <Footer />
    </div>
  );
};

export default Drinks;
