import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMealLetter } from "../../actions/meals";
import Recipes from "../layout/Recipes";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../other/Pagination";

const None = ({ getMealLetter, meals: { meals, totalPages } }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("filter"));
  const [page, setPage] = useState(Number(searchParams.get("page")));
  if (!filter) setFilter("a");
  if (!page) setPage(1);
  useEffect(() => {
    setSearchParams({
      filter,
      page,
    });
    getMealLetter(filter);
  }, []);

  const onChangeFilter = newFilter => {
    setSearchParams({
      filter: newFilter,
      page: 1,
    });
    setPage(1);
    setFilter(newFilter);
    getMealLetter(newFilter);
  };

  const onChangePage = page => {
    setSearchParams({
      filter,
      page,
    });
    setPage(page);
  };

  const arrowPage = direction => {
    let newPage = page;
    if (direction === "left") {
      if (page !== 0) newPage = page - 1;
    } else {
      if (page !== totalPages) newPage = page + 1;
    }
    setPage(newPage);
    setSearchParams({
      filter,
      page: newPage,
    });
  };

  const className = l => {
    if (l === filter) return "letter letter-fill";
    else return "letter";
  };
  return (
    <Fragment>
      <div className="none">
        <h1>Search recipes by First Letter </h1>
        <div className="abc">
          <p onClick={() => onChangeFilter("a")} className={className("a")}>
            A
          </p>
          <p className={className("b")} onClick={() => onChangeFilter("b")}>
            B
          </p>
          <p className={className("c")} onClick={() => onChangeFilter("c")}>
            C
          </p>
          <p className={className("d")} onClick={() => onChangeFilter("d")}>
            D
          </p>
          <p className={className("e")} onClick={() => onChangeFilter("e")}>
            E
          </p>
          <p className={className("f")} onClick={() => onChangeFilter("f")}>
            F
          </p>
          <p className={className("g")} onClick={() => onChangeFilter("g")}>
            G
          </p>
          <p className={className("h")} onClick={() => onChangeFilter("h")}>
            H
          </p>
          <p className={className("i")} onClick={() => onChangeFilter("i")}>
            I
          </p>
          <p className={className("j")} onClick={() => onChangeFilter("j")}>
            J
          </p>
          <p className={className("k")} onClick={() => onChangeFilter("k")}>
            K
          </p>
          <p className={className("l")} onClick={() => onChangeFilter("l")}>
            L
          </p>
          <p className={className("m")} onClick={() => onChangeFilter("m")}>
            M
          </p>
          <p className={className("n")} onClick={() => onChangeFilter("n")}>
            N
          </p>
          <p className={className("o")} onClick={() => onChangeFilter("o")}>
            O
          </p>
          <p className={className("p")} onClick={() => onChangeFilter("p")}>
            P
          </p>
          <p className={className("q")} onClick={() => onChangeFilter("q")}>
            Q
          </p>
          <p className={className("r")} onClick={() => onChangeFilter("r")}>
            R
          </p>
          <p className={className("s")} onClick={() => onChangeFilter("s")}>
            S
          </p>
          <p className={className("t")} onClick={() => onChangeFilter("t")}>
            T
          </p>
          <p className={className("u")} onClick={() => onChangeFilter("u")}>
            U
          </p>
          <p className={className("v")} onClick={() => onChangeFilter("v")}>
            V
          </p>
          <p className={className("w")} onClick={() => onChangeFilter("w")}>
            W
          </p>
          <p className={className("x")} onClick={() => onChangeFilter("x")}>
            X
          </p>
          <p className={className("y")} onClick={() => onChangeFilter("y")}>
            Y
          </p>
          <p className={className("z")} onClick={() => onChangeFilter("z")}>
            Z
          </p>
        </div>
      </div>

      {page <= 0 || (totalPages != 0 && page > totalPages) ? (
        <p>Invalid Page</p>
      ) : (
        <Recipes page={page} perPage={4} />
      )}
      <Pagination
        totalPages={totalPages}
        arrowPage={arrowPage}
        onChangePage={onChangePage}
        page={page}
      />
    </Fragment>
  );
};

None.propTypes = {
  getMealLetter: PropTypes.func.isRequired,
  meals: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals,
});

export default connect(mapStateToProps, { getMealLetter })(None);
