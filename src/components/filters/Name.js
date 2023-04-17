import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMeal } from "../../actions/meals";
import Recipes from "../layout/Recipes";
import { useSearchParams } from "react-router-dom";
import { changeFilter, changePage } from "../../actions/meals";
import { Pagination } from "../other/Pagination";

const Name = ({ getMeal, changePage, meals: { totalPages, page } }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let f = searchParams.get("filter");
  let p = searchParams.get("page");
  if (!f) f = "";
  if (!p) p = 1;

  const [filter, setFilter] = useState(f);

  useEffect(() => {
    changePage(Number(p));
    setSearchParams({
      filter: f,
      page: p,
    });
    getMeal(f);
  }, []);

  const onChange = e => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setSearchParams({
      filter: e.target[0].value,
      page: 1,
    });
    getMeal(e.target[0].value);
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
      <div className="search">
        <form className="input-group" onSubmit={e => onSubmit(e)}>
          <input
            type="text"
            className="input"
            placeholder="Search Food"
            value={filter}
            onChange={e => onChange(e)}
          />
          <button className="btn btn--accent" type="submit">
            Search
          </button>
        </form>
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

Name.propTypes = {
  getMeal: PropTypes.func.isRequired,
  meals: PropTypes.object.isRequired,
  changeFilter: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals,
});

export default connect(mapStateToProps, { getMeal, changeFilter, changePage })(
  Name
);
