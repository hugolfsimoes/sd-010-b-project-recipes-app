export async function getFoodCategories() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}

export async function getFoodRecipes() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}
export async function getFoodByCategory(category) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}

export async function getDrinkCategories() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks;
}

export async function getDrinkRecipes() {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks;
}

export async function getDrinkByCategory(category) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks;
}
