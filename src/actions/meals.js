import axios from "axios";
import {
  GET_MEAL,
  MEAL_ERROR,
  GET_MEALLETTER,
  GET_MEALID,
  GET_CATEGORIES,
  CATEGORIES_ERROR,
  GET_AREAS,
  GET_FULLCATEGORIES,
  GET_INGREDIENTS,
  GET_MEALCATEGORY,
  GET_MEALAREA,
  GET_MEALINGREDIENT,
  CHANGE_FILTER,
  SET_PAGE,
} from "../actions/types";
//Search meal by name
export const getMeal = name => async dispatch => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );

    dispatch({
      type: GET_MEAL,
      payload: res.data.meals,
    });
  } catch (err) {
    dispatch({
      type: MEAL_ERROR,
    });
  }
};

//Search meal by letter
export const getMealLetter = letter => async dispatch => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );

    dispatch({
      type: GET_MEALLETTER,
      payload: res.data.meals,
    });
  } catch (err) {
    dispatch({
      type: MEAL_ERROR,
    });
  }
};

//Search meal by id
export const getMealId = id => async dispatch => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    dispatch({
      type: GET_MEALID,
      payload: res.data.meals,
    });
  } catch (err) {
    dispatch({
      type: MEAL_ERROR,
    });
  }
};

//Search meal by main ingredient
export const getMealIngredient = ingredient => async dispatch => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    dispatch({
      type: GET_MEALINGREDIENT,
      payload: res.data.meals,
    });
  } catch (err) {
    dispatch({
      type: MEAL_ERROR,
    });
  }
};

//Search meal by main category
export const getMealCategory = category => async dispatch => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );

    dispatch({
      type: GET_MEALCATEGORY,
      payload: res.data.meals,
    });
  } catch (err) {
    dispatch({
      type: MEAL_ERROR,
    });
  }
};

//Search meal by area
export const getMealArea = area => async dispatch => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );

    dispatch({
      type: GET_MEALAREA,
      payload: res.data.meals,
    });
  } catch (err) {
    dispatch({
      type: MEAL_ERROR,
    });
  }
};

//Search all meal categories
export const getFullCategories = () => async dispatch => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );

    dispatch({
      type: GET_FULLCATEGORIES,
      payload: res.data.categories,
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
    });
  }
};

//Search all categories names
export const getCategories = () => async dispatch => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
    );
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data.meals,
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
    });
  }
};

//Search all Areas names
export const getAreas = () => async dispatch => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );

    dispatch({
      type: GET_AREAS,
      payload: res.data.meals,
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
    });
  }
};

//Search all Ingredients names
export const getIngredients = () => async dispatch => {
  try {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    dispatch({
      type: GET_INGREDIENTS,
      payload: res.data.meals,
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
    });
  }
};

export const getIngredientImg = ingredient => {
  return `www.themealdb.com/images/ingredients/${ingredient}.png`;
};

export const getIngredientImgSmall = ingredient => {
  return `www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
};

export const changeFilter = filter => dispatch => {
  dispatch({
    type: CHANGE_FILTER,
    payload: filter,
  });
};

export const changePage = page => dispatch => {
  dispatch({
    type: SET_PAGE,
    payload: page,
  });
};
