export const setToken = (email) => {
  localStorage.mealsToken = 1;
  localStorage.cocktailsToken = 1;
  localStorage.user = JSON.stringify({ email });
};

export const checkRecypeId = (idRecipe) => {
  const dones = localStorage.doneRecipes ? JSON.parse(localStorage.doneRecipes) : [];
  return dones.find(({ id }) => id === idRecipe);
};

export const checkFavoriteId = (idRecipe) => {
  const favorite = localStorage.favoriteRecipes
    ? JSON.parse(localStorage.favoriteRecipes)
    : [];
  return favorite.find(({ id }) => id === idRecipe);
};

export const checkProgress = (idRecipe, meals) => {
  const recipe = meals ? 'meals' : 'cocktails';
  return (
    localStorage.inProgressRecipes
    && JSON.parse(localStorage.inProgressRecipes)[recipe][idRecipe]
  );
};

export const getStorageRecipe = (id, meals) => {
  const option = meals ? 'meals' : 'cocktails';
  if (localStorage.inProgressRecipes) {
    const local = JSON.parse(localStorage.inProgressRecipes);
    return local[option][id];
  }
};

export const updateStorageRecipe = (id, recipe, meals) => {
  const option = meals ? 'meals' : 'cocktails';
  const reverse = !meals ? 'meals' : 'cocktails';
  if (localStorage.inProgressRecipes) {
    const local = JSON.parse(localStorage.inProgressRecipes);
    localStorage.inProgressRecipes = JSON.stringify({
      ...local,
      [option]: {
        ...local[option],
        [id]: recipe,
      },
    });
  } else {
    localStorage.inProgressRecipes = JSON.stringify({
      [option]: {
        [id]: recipe,
      },
      [reverse]: {},
    });
  }
};

export const getDonesRecipes = () => localStorage.doneRecipes
&& JSON.parse(localStorage.doneRecipes);

export const getFavoritesRecipes = () => localStorage.favoriteRecipes
&& JSON.parse(localStorage.favoriteRecipes);

export const addRecipeDones = (recipe) => {
  if (localStorage.doneRecipes) {
    const local = JSON.parse(localStorage.doneRecipes);
    const newDones = [...local, recipe];
    localStorage.doneRecipes = JSON.stringify(newDones);
  } else {
    const newDones = [recipe];
    localStorage.doneRecipes = JSON.stringify(newDones);
  }
};