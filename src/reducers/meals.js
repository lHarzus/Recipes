import {
  GET_MEAL,
  MEAL_ERROR,
  GET_MEALID,
  GET_MEALLETTER,
  GET_CATEGORIES,
  CATEGORIES_ERROR,
  GET_AREAS,
  GET_FULLCATEGORIES,
  GET_INGREDIENTS,
  GET_MEALCATEGORY,
  GET_MEALAREA,
  GET_MEALINGREDIENT,
  CHANGE_FILTER,
  TOTAL_PAGES,
  SET_PAGE,
} from "../actions/types";

const initialState = {
  meals: [],
  allcategories: [],
  categories: [],
  areas: [],
  ingredient: [],
  filter: "",
  totalPages: 0,
  page: 1,
};

export default function Alert(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MEAL:
    case GET_MEALID:
    case GET_MEALLETTER:
    case GET_MEALAREA:
    case GET_MEALCATEGORY:
    case GET_MEALINGREDIENT:
      return {
        ...state,
        meals: payload,
        totalPages: payload ? Math.ceil(payload.length / 4) : 0,
      };
    case GET_FULLCATEGORIES:
      return {
        ...state,
        allcategories: payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case GET_AREAS:
      return {
        ...state,
        areas: payload,
      };
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredient: payload,
      };
    case CHANGE_FILTER:
      return {
        ...state,
        filter: payload,
      };
    case TOTAL_PAGES:
      return {
        ...state,
        totalPages: payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: payload,
      };
    case CATEGORIES_ERROR:
    case MEAL_ERROR:
      return state;
    default:
      return state;
  }
}
