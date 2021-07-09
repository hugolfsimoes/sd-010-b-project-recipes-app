import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { buscaReceita } from '../services/servicesApi';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import { addIngredients, getIngredients } from '../services/localStorage';

function ReceitaEmProgresso() {
  const rotaAtual = useLocation().pathname;
  const { id } = useParams();
  const [apelidoAPI] = rotaAtual.match(/\w+/);
  const ingredientesSalvos = getIngredients(apelidoAPI, id);
  const [parametrosBusca] = useState({ apelidoAPI, input: id });
  const [receita, setReceita] = useState({});
  const [ingredientesCheckboxes, setIngredientesCheckboxes] = useState([]);
  const [ingredientes, setIngredientes] = useState(ingredientesSalvos);

  const inicializarIngredientes = (objReceitas) => {
    let indexAuxiliar = 0;
    const ingsMeds = Object.keys(objReceitas).reduce((acc, key) => {
      if (key.match(/strIngredient\d+/) && objReceitas[key]) {
        return acc.concat([[objReceitas[key]]]);
      }

      if (key.match(/strMeasure\d+/) && objReceitas[key]) {
        acc[indexAuxiliar].push(objReceitas[key]);
        indexAuxiliar += 1;
      }
      return acc;
    }, []);
    setIngredientesCheckboxes(ingsMeds);
  };

  useEffect(() => {
    const didMount = async () => {
      const respostaApi = await buscaReceita(parametrosBusca);
      setReceita(respostaApi);
      inicializarIngredientes(respostaApi);
    };
    didMount();
  }, [parametrosBusca]);

  useEffect(() => {
    if (!ingredientes) {
      setIngredientes([]);
    }

    if (ingredientes) {
      addIngredients(apelidoAPI, id, ingredientes);
    }
  }, [apelidoAPI, id, ingredientes]);

  const renderizaImagemReceita = () => {
    const src = (
      (apelidoAPI === 'comidas') ? receita.strMealThumb : receita.strDrinkThumb);
    const alt = ((apelidoAPI === 'comidas') ? receita.strMeal : receita.strDrink);
    return (
      <img
        data-testid="recipe-photo"
        src={ `${src}` }
        alt={ `${alt}` }
      />
    );
  };

  const renderizaTituloReceitas = () => {
    const titulo = ((apelidoAPI === 'comidas') ? receita.strMeal : receita.strDrink);
    return (
      <h2 data-testid="recipe-title">{titulo}</h2>
    );
  };

  const renderizaBotoesTitulo = () => (
    <>
      <button type="button">
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="share-btn"
        />
      </button>
      <button type="button">
        <img
          data-testid="favorite-btn"
          src={ favoriteIcon }
          alt="favorite-btn"
        />
      </button>
    </>
  );

  const renderizaCategoriaReceita = () => (
    <div data-testid="recipe-category">{receita.strCategory}</div>
  );

  const handleChange = ({ target: { checked, name } }) => {
    if (checked) {
      setIngredientes([...ingredientes, name]);
    } else {
      setIngredientes(ingredientes.filter((ingrediente) => ingrediente !== name));
    }
  };

  const renderizaIngredientes = () => (
    <>
      {ingredientesCheckboxes.map(([nome, medida], index) => (
        <div key={ nome } className="mb-3">
          <label
            htmlFor={ nome }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ nome }
              name={ nome }
              value={ nome }
              onChange={ handleChange }
              checked={ ingredientes.includes(nome) }
            />
            { `${medida} ${nome}` }
          </label>
        </div>
      ))}
    </>
  );

  const renderizaInstrucoes = () => (
    <div data-testid="instructions">{receita.strInstructions}</div>
  );

  const renderizaBotaoFinalizar = () => (
    <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
  );

  return (
    <>
      { renderizaImagemReceita() }
      { renderizaTituloReceitas() }
      { renderizaBotoesTitulo() }
      { renderizaCategoriaReceita() }
      { renderizaIngredientes() }
      { renderizaInstrucoes() }
      { renderizaBotaoFinalizar() }
    </>
  );
}

export default ReceitaEmProgresso;