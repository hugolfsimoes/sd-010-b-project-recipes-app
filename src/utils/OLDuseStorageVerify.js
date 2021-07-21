// import { useState, useEffect } from 'react';

// const useStorageVerify = (keys) => {
//   const { id, storageKey, key } = keys;
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isDone, setIsDone] = useState(false);
//   const [isInProgress, setIsInProgress] = useState(false);
//   const storedRecipes = JSON.parse(localStorage.getItem(storageKey));

//   const isRecipeStored = () => {
//     switch (storageKey) {
//     case 'favoriteRecipes':
//       setIsFavorite(storedRecipes.some((recipe) => recipe.id === id));
//       break;
//     case 'doneRecipes':
//       setIsDone(storedRecipes.some((recipe) => recipe.id === id));
//       break;
//     case 'inProgressRecipes':
//       setIsInProgress(Object.keys(storedRecipes[key])
//         .some((recipeId) => recipeId === id));
//       break;
//     default:
//       break;
//     }
//   };

//   useEffect(() => {
//     if (storedRecipes) {
//       isRecipeStored();
//     } else {
//       // createKey();
//     }
//   // }, [isFavorite, isDone, isInProgress]);
//   }, []);

//   return [isFavorite, setIsFavorite, isDone, isInProgress];
// };

// export default useStorageVerify;
