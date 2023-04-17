import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Recipe } from "../recipes/Recipe";

const Recipes = ({ meals: { meals }, page, perPage }) => {
  return (
    <div className="recipes">
      {meals ? (
        Array.from({ length: perPage }, (_, i) => i + (page - 1) * perPage).map(
          i =>
            meals[i] ? <Recipe key={meals[i].idMeal} meal={meals[i]} /> : ""
        )
      ) : (
        <p>Não há resultados</p>
      )}
    </div>
  );
};

Recipes.propTypes = {
  meals: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals,
});

export default connect(mapStateToProps)(Recipes);
