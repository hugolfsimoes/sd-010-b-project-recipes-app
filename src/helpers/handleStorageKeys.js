export function handleIsStored(keys) {
  const { id, storageKey, key } = keys;
  const storedRecipes = JSON.parse(localStorage.getItem(storageKey));

  if (storedRecipes) {
    switch (storageKey) {
    case 'favoriteRecipes':
    case 'doneRecipes':
      return storedRecipes.some((recipe) => recipe.id === id);
    case 'inProgressRecipes':
      return (
        storedRecipes[key]
          ? Object.keys(storedRecipes[key])
            .some((recipeId) => recipeId === id) : false);
    default:
      break;
    }
  }
}

export function handleFavorite({ id, type, area = '', category = '', alcoholicOrNot = '',
  name, image, isFavorite }) {
  const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (!isFavorite) {
    const favRecipe = {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes, favRecipe]));
  } else {
    const favIndex = favRecipes.indexOf(favRecipes.find((favId) => favId.id === id));
    const newStorage = [...favRecipes.slice(0, favIndex),
      ...favRecipes.slice(favIndex + 1)];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
}

export function checkListIngredients({ key, checked, index, id, countChecked }) {
  console.log(`${key}, ${checked}, ${index}, ${id}, ${countChecked}`);
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { cocktails: { [id]: [] }, meals: { [id]: [] } };
  if (checked) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify(
        {
          ...recipesInProgress,
          [key]: {
            ...recipesInProgress[key],
            [id]: [...recipesInProgress[key][id], index],
          },
        },
      ));
    return countChecked + 1;
  }
  let ingredientsList = recipesInProgress[key][id];
  const ingredientIndex = ingredientsList.indexOf(index);
  ingredientsList = [...ingredientsList.slice(0, ingredientIndex),
    ...ingredientsList.slice(ingredientIndex + 1)];
  localStorage.setItem('inProgressRecipes',
    JSON.stringify(
      {
        ...recipesInProgress,
        [key]: {
          ...recipesInProgress[key],
          [id]: ingredientsList,
        },
      },
    ));
  return countChecked - 1;
}

export function handleDoneRecipes({ id, key, type, area = '', category = '',
  alcoholicOrNot = '', name, image, strTags = '' }) {
  if (!handleIsStored({ id, storageKey: 'doneRecipes' })) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const tags = strTags ? strTags.split(',') : [];
    const doneDate = new Date().toLocaleDateString();
    localStorage.setItem('doneRecipes', JSON.stringify(
      [...doneRecipes,
        { id, type, area, category, alcoholicOrNot, name, image, doneDate, tags },
      ],
    ));
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    delete recipesInProgress[key][id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
  }
}

export function handleRecipeInProgress({ id, key }) {
  // setIdProgress(idDetail);
  // setRecipeInProgress(recipes);
  const recipesInProgress = JSON.parse(localStorage
    .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
  const recipeInProgress = {
    ...recipesInProgress,
    [key]: {
      ...recipesInProgress[key],
      [id]: [],
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
}
