import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export const Recipe = ({ meal }) => {
  const navigate = useNavigate();
  return (
    <div className="recipe">
      <div
        className="clickable"
        onClick={() => navigate(`/recipe/${meal.idMeal}`)}>
        <h2>
          {meal.strMeal} <i className="bi bi-arrow-right"></i>
        </h2>
        <div className="img-wrapper">
          <img src={meal.strMealThumb}></img>
        </div>
      </div>
      {meal.strTags ? (
        <p>
          <span className="bold">Tags:</span> <span>{meal.strTags}</span>
        </p>
      ) : (
        ""
      )}
      <p>
        {meal.strIngredient1 ? (
          <Fragment>
            <span className="bold">Ingrediends:</span>
            <span>
              {meal.strIngredient1}
              {", "}
              {meal.strIngredient2}
              {", "}
              {meal.strIngredient3}
              {", "}
              {meal.strIngredient4}
              {", "}
              {meal.strIngredient5}
              {", "}
              {meal.strIngredient6}
              {", "}
              {meal.strIngredient7}
              {", "}
              {meal.strIngredient8}, etc.
            </span>
          </Fragment>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};
