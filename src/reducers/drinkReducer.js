import { REQUEST_INGREDIENT_DRINK, REQUEST_DRINK_BY_ID } from '../actions';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  // drinks: [],
  drinkById: [],
};

const drinkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_INGREDIENT_DRINK:
    return {
      ...state,
      recipes: action.payload.result.drinks,
    };
  // case REQUEST_CATEGORIE_DRINK:
  //   return {
  //     ...state,
  //     categories: action.payload.result.drinks,
  //   };
  // case REQUEST_DRINK:
  //   return {
  //     ...state,
  //     drinks: action.payload.result.drinks,
  //   };
  case REQUEST_DRINK_BY_ID:
    return {
      ...state,
      drinkById: action.payload.response.drinks,
    };
  default:
    return state;
  }
};

export default drinkReducer;