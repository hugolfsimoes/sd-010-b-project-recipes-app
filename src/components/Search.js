import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import BtnSearch from './BtnSearch';

export default function Search() {
  const { setSearch, search,
    setRadio } = useContext(AppContext);

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            data-testid="search-input"
            value={ search }
            onChange={ ({ target: { value } }) => setSearch(value) }
          />
          <Form.Check
            type="radio"
            data-testid="ingredient-search-radio"
            label="Ingrediente"
            name="grup-1"
            value="ingredient"
            onClick={ ({ target: { value } }) => setRadio(value) }
          />
          <Form.Check
            type="radio"
            data-testid="name-search-radio"
            label="Nome"
            value="name"
            onClick={ ({ target: { value } }) => setRadio(value) }
            name="grup-1"
          />
          <Form.Check
            type="radio"
            data-testid="first-letter-search-radio"
            label="Primeira letra"
            name="grup-1"
            value="firstLetter"
            onClick={ ({ target: { value } }) => setRadio(value) }
          />
        </Form.Group>
      </Form>
      <BtnSearch />
    </div>
  );
}

// Agradecimentos a Daniel Roberto Turma 10 Tribo B, pelo auxilio na logica do useLocation
