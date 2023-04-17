import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import Recipes from "../layout/Recipes";
import { useSearchParams } from "react-router-dom";
import { changeFilter, changePage } from "../../actions/meals";
import { getMealCategory, getCategories } from "../../actions/meals";
import { connect } from "react-redux";
import { Pagination } from "../other/Pagination";

const Category = ({
  changePage,
  getCategories,
  getMealCategory,
  meals: { totalPages, page, categories },
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let f = searchParams.get("filter");
  let p = searchParams.get("page");
  if (!f) f = "beef";
  if (!p) p = 1;

  const [filter, setFilter] = useState(f);
  useEffect(() => {
    getCategories();
    changePage(Number(p));
    setSearchParams({
      filter,
      page: p,
    });
    getMealCategory(filter);
  }, []);

  const onClick = (e, category) => {
    e.preventDefault();
    setSearchParams({
      filter: category,
      page: 1,
    });
    changePage(1);
    setFilter(category);
    getMealCategory(category);
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
      <div className="category">
        {categories.map((c, i) => (
          <Fragment>
            <p
              key={i}
              className={
                c.strCategory && filter === c.strCategory.toLowerCase()
                  ? "category-selected"
                  : ""
              }
              onClick={e => onClick(e, c.strCategory.toLowerCase())}>
              {c.strCategory}
            </p>
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

Category.propTypes = {
  meals: PropTypes.object.isRequired,
  changeFilter: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  getMealCategory: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals,
});

export default connect(mapStateToProps, {
  changePage,
  changeFilter,
  getMealCategory,
  getCategories,
})(Category);
