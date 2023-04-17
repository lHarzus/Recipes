import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMealId } from "../../actions/meals";

const FullRecipe = ({ meals: { meals }, getMealId }) => {
  console.log(window.location.pathname.split("/")[2]);
  useEffect(() => {
    getMealId(window.location.pathname.split("/")[2]);
  }, []);
  const meal = meals[0];

  const strMeasure = nr => {
    return meal["strMeasure" + nr];
  };

  const strIngredient = nr => {
    return meal["strIngredient" + nr];
  };
  console.log(meal);
  return (
    <Fragment>
      {meal ? (
        <div className="full-recipe">
          <div className="recipe-header">
            <div>
              <h1>{meal.strMeal}</h1>
              <div className="cc">
                <p>
                  <span className="bold">Category: </span>
                  <span> {meal.strCategory}</span>
                </p>
                <p>
                  <span className="bold">Country: </span>
                  <span>{meal.strArea}</span>
                </p>
              </div>
            </div>
            <div>
              <img src={meal.strMealThumb}></img>
            </div>
          </div>

          <iframe
            src={
              meal.strYoutube
                ? meal.strYoutube.replace("watch?v=", "embed/")
                : ""
            }></iframe>
          <div className="recipe-ingredients">
            <h2>Ingredients</h2>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            ].map(i => {
              if (
                strIngredient(i) !== null &&
                strIngredient(i) !== "" &&
                strIngredient !== " "
              ) {
                return (
                  <p>
                    <i class="bi bi-dot"></i>
                    {strMeasure(i)} {strIngredient(i)}
                  </p>
                );
              }
              return "";
            })}
          </div>
          <div className="recipe-instructions">
            <h3>Instructions</h3>
            <p className="instructions">{meal.strInstructions}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

FullRecipe.propTypes = {
  meals: PropTypes.object.isRequired,
  getMealId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals,
});

export default connect(mapStateToProps, { getMealId })(FullRecipe);
