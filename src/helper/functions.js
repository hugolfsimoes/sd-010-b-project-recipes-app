function progress({ objectStart, leng, typeRecipe, idRecipe }) {
  if (typeRecipe !== 'food') {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        ...objectStart.cocktails,
        [idRecipe]: [...leng],
      },
      meals: {
        ...objectStart.meals,
      },
    }));
  }

  if (typeRecipe === 'food') {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        ...objectStart.cocktails,
      },
      meals: {
        ...objectStart.meals,
        [idRecipe]: [...leng],
      },
    }));
  }
}

export function redirectPage(history, idRecipe, typeRecipe) {
  return typeRecipe === 'food'
    ? history.push(`/comidas/${idRecipe}/in-progress`)
    : history.push(`/bebidas/${idRecipe}/in-progress`);
}

export async function copyLink(copy, setShow, typeRecipe, idRecipe) {
  await copy(`http://localhost:3000/${typeRecipe === 'food' || typeRecipe === 'comida' ? 'comidas' : 'bebidas'}/${idRecipe}`);
  setShow(true);
}

function alcoholicCheck(list) {
  return list.strAlcoholic === 'Alcoholic' ? 'Alcoholic' : 'Non Alcoholic';
}

export function help(value, secondValue) {
  // console.log(secondValue);
  return value !== null ? value : secondValue;
}

export function favoriteClick({
  arrayFavorite, list, favorite, typeRecipe, idRecipe, setFavorite }) {
  if (favorite) {
    setFavorite(false);
    const filt = arrayFavorite.filter((item) => item.id !== idRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filt));
  } else {
    setFavorite(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...arrayFavorite,
        {
          id: idRecipe,
          type: typeRecipe === 'food' ? 'comida' : 'bebida',
          area: typeRecipe === 'food' ? list.strArea : '',
          category: list.strCategory,
          alcoholicOrNot: typeRecipe === 'food' ? '' : (alcoholicCheck(list)),
          name: typeRecipe === 'food' ? list.strMeal : list.strDrink,
          image: typeRecipe === 'food' ? list.strMealThumb : list.strDrinkThumb,
        }],
    ));
  }
}
// função conseguida através do link: https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript
function dataAtualFormatada() {
  const data = new Date();
  const dia = data.getDate().toString();
  const diaF = (dia.length === 1) ? `0${dia}` : dia;
  const mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
  const mesF = (mes.length === 1) ? `0${mes}` : mes;
  const anoF = data.getFullYear();
  return `${diaF}/${mesF}/${anoF}`;
}

export function doneClick({ arrayDone, list, typeRecipe, idRecipe, history }) {
  // console.log(list);
  localStorage.setItem('doneRecipes', JSON.stringify(
    [...arrayDone,
      {
        id: idRecipe,
        type: typeRecipe === 'food' ? 'comida' : 'bebida',
        area: typeRecipe === 'food' ? list.strArea : '',
        category: list.strCategory,
        alcoholicOrNot: typeRecipe === 'food' ? '' : (alcoholicCheck(list)),
        name: typeRecipe === 'food' ? list.strMeal : list.strDrink,
        image: typeRecipe === 'food' ? list.strMealThumb : list.strDrinkThumb,
        doneDate: dataAtualFormatada(),
        tags: list.strTags === null ? [] : list.strTags.split(','),
      }],
  ));
  history.push('/receitas-feitas');
}

function pushArray({ valor,
  obj,
  typeRecipe,
  objectStart,
  idRecipe,
  setStatus,
}) {
  setStatus(true);
  if (typeRecipe === 'food') {
    const array = obj.meals[idRecipe];
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        ...objectStart.cocktails,
      },
      meals: {
        ...objectStart.meals,
        [idRecipe]: [...array, valor],
      },
    }));
  } else {
    const array = obj.cocktails[idRecipe];
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        ...objectStart.cocktails,
        [idRecipe]: [...array, valor],
      },
      meals: {
        ...objectStart.meals,

      },
    }));
  }
}

function removeArray({ valor,
  obj,
  typeRecipe,
  objectStart,
  idRecipe,
  setStatus,
}) {
  if (typeRecipe === 'food') {
    const array = obj.meals[idRecipe];
    const index = array.indexOf(valor);
    array.splice(index, 1);
    if (array.length === 0) {
      setStatus(false);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        ...objectStart.cocktails,
      },
      meals: {
        ...objectStart.meals,
        [idRecipe]: [...array],
      },
    }));
  } else {
    const array = obj.cocktails[idRecipe];
    const index = array.indexOf(valor);
    array.splice(index, 1);
    // console.log(array);
    if (array.length === 0) {
      setStatus(false);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        ...objectStart.cocktails,
        [idRecipe]: [...array],
      },
      meals: {
        ...objectStart.meals,

      },
    }));
  }
}

export function changeList({ target }, {
  typeRecipe, objectStart, idRecipe, setDetail, detail, setStatus }) {
  const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const newObject = detail;
  if (detail[target.value] === 'noDetailClass') {
    newObject[target.value] = 'detailClass';
    setDetail({ ...newObject });
    const valor = target.value;
    removeArray(
      { valor,
        obj,
        typeRecipe,
        objectStart,
        idRecipe,
        setStatus,
      },
    );
  } else {
    newObject[target.value] = 'noDetailClass';
    setDetail({ ...newObject });
    const valor = target.value;
    pushArray({ valor,
      obj,
      typeRecipe,
      objectStart,
      idRecipe,
      setStatus,
    });
  }
}

export default progress;
