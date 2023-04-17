import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import Recipes from "../layout/Recipes";
import { useSearchParams } from "react-router-dom";
import { changePage } from "../../actions/meals";
import { getMealIngredient, getIngredients } from "../../actions/meals";
import { connect } from "react-redux";
import { Pagination } from "../other/Pagination";

const Ingredient = ({
  changePage,
  getIngredients,
  getMealIngredient,
  meals: { totalPages, page, ingredient },
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let f = searchParams.get("filter");
  let p = searchParams.get("page");
  if (!f) f = "Chicken";
  if (!p) p = 1;

  const [filter, setFilter] = useState(f);
  useEffect(() => {
    getIngredients();
    changePage(Number(p));
    setSearchParams({
      filter,
      page: p,
    });
    getMealIngredient(filter);
  }, []);

  const onClick = (e, Ingredient) => {
    e.preventDefault();
    setSearchParams({
      filter: Ingredient,
      page: 1,
    });
    changePage(1);
    setFilter(Ingredient);
    getMealIngredient(Ingredient);
  };

  const onChangePage = page => {
    setSearchParams({
      filter,
      page,
    });
    changePage(page);
  };

  const arrowPage = direction => {
    let newPage = page;
    if (direction === "left") {
      if (page !== 0) newPage = page - 1;
    } else {
      if (page !== totalPages) newPage = page + 1;
    }
    changePage(newPage);
    setSearchParams({
      filter,
      page: newPage,
    });
  };

  return (
    <Fragment>
      <div className="ingredient">
        {ingredient.map((a, i) => (
          <Fragment key={i}>
            <div
              className={
                a.strIngredient && filter === a.strIngredient.toLowerCase()
                  ? "ingredient-opt category-selected"
                  : "ingredient-opt "
              }
              onClick={e => onClick(e, a.strIngredient.toLowerCase())}>
              <p>{a.strIngredient}</p>
              <img
                src={`https://www.themealdb.com/images/ingredients/${a.strIngredient}-Small.png`}></img>
            </div>
          </Fragment>
        ))}
      </div>
      <Recipes page={page} perPage={4} />
      <Pagination
        totalPages={totalPages}
        arrowPage={arrowPage}
        onChangePage={onChangePage}
        page={page}
      />
    </Fragment>
  );
};

Ingredient.propTypes = {
  meals: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  getMealIngredient: PropTypes.func.isRequired,
  getIngredients: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals,
});

export default connect(mapStateToProps, {
  changePage,
  getMealIngredient,
  getIngredients,
})(Ingredient);
