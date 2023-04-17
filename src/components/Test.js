import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  getMeal,
  getAreas,
  getCategories,
  getFullCategories,
  getIngredientImg,
  getIngredientImgSmall,
  getMealCategory,
  getMealArea,
  getMealId,
  getMealIngredient,
  getMealLetter,
  getIngredients,
} from "../actions/meals";
import { connect } from "react-redux";

const Test = ({
  getMeal,
  meals,
  getAreas,
  getCategories,
  getFullCategories,
  getIngredientImg,
  getIngredientImgSmall,
  getMealCategory,
  getMealArea,
  getMealId,
  getMealIngredient,
  getMealLetter,
  getIngredients,
}) => {
  useEffect(() => {
    getMeal("Ar");
    getAreas();
    getCategories();
    getFullCategories();
    getIngredients();
    //getMealCategory("Seafood");
    //getMealArea("Portuguese");
    //getMealId("52772");
    //getMealIngredient("Pork");
    //getMealLetter("a");
  }, []);
  console.log(meals);
  return <div>Test</div>;
};

Test.propTypes = {
  getMeal: PropTypes.func.isRequired,
  getAreas: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getFullCategories: PropTypes.func.isRequired,
  getIngredientImg: PropTypes.func.isRequired,
  getIngredientImgSmall: PropTypes.func.isRequired,
  getMealCategory: PropTypes.func.isRequired,
  getMealArea: PropTypes.func.isRequired,
  getMealId: PropTypes.func.isRequired,
  getMealIngredient: PropTypes.func.isRequired,
  getMealLetter: PropTypes.func.isRequired,
  getIngredients: PropTypes.func.isRequired,
  meals: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals,
});

export default connect(mapStateToProps, {
  getMeal,
  getAreas,
  getCategories,
  getFullCategories,
  getIngredientImg,
  getIngredientImgSmall,
  getMealCategory,
  getMealArea,
  getMealId,
  getMealIngredient,
  getMealLetter,
  getIngredients,
})(Test);
