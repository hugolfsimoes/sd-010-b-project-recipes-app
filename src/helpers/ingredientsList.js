// function createListIngredients(recipe) {
//   let ingredientsList = [];
//   const ingredients = Object.entries(recipe).filter(([key, value]) => (
//     value && value !== ' ' && (
//       key.includes('strIngredient') || key.includes('strMeasure'))));
//   for (let i = 0; i < ingredients.length / 2; i += 1) {
//     ingredientsList = [...ingredientsList,
//       `${ingredients[i][1]} - ${ingredients[i + (ingredients.length / 2)][1]}`];
//   }
//   return ingredientsList;
// }

function createListIngredients(recipe) {
  const NUMBER_OF_INGREDIENTS = 20;
  let ingredientsList = [];
  for (let i = 1; i <= NUMBER_OF_INGREDIENTS; i += 1) {
    if (recipe[`strIngredient${i}`] && recipe[`strIngredient${i}`].trim()) {
      ingredientsList = [...ingredientsList,
        `${recipe[`strIngredient${i}`]}${recipe[`strMeasure${i}`]
        && recipe[`strMeasure${i}`].trim() ? ` - ${recipe[`strMeasure${i}`]}` : ''}`];
    } else break;
  }
  return ingredientsList;
}

export default createListIngredients;
