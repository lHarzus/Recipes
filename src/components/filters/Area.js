import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import Recipes from "../layout/Recipes";
import { useSearchParams } from "react-router-dom";
import { changeFilter, changePage } from "../../actions/meals";
import { getMealArea, getAreas } from "../../actions/meals";
import { connect } from "react-redux";
import { Pagination } from "../other/Pagination";

const abreviations = [
  { area: "American", abreviation: "us" },
  { area: "British", abreviation: "uk" },
  { area: "Canadian", abreviation: "ca" },
  { area: "Chinese", abreviation: "ch" },
  { area: "Croatian", abreviation: "hr" },
  { area: "Dutch", abreviation: "nl" },
  { area: "Egyptian", abreviation: "eg" },
  { area: "French", abreviation: "fr" },
  { area: "Greek", abreviation: "gr" },
  { area: "Indian", abreviation: "in" },
  { area: "Irish", abreviation: "ei" },
  { area: "Italian", abreviation: "it" },
  { area: "Jamaican", abreviation: "jm" },
  { area: "Japanese", abreviation: "ja" },
  { area: "Kenyan", abreviation: "ke" },
  { area: "Malaysian", abreviation: "my" },
  { area: "Mexican", abreviation: "mx" },
  { area: "Moroccan", abreviation: "mo" },
  { area: "Polish", abreviation: "pl" },
  { area: "Portuguese", abreviation: "po" },
  { area: "Russian", abreviation: "rs" },
  { area: "Spanish", abreviation: "sp" },
  { area: "Thai", abreviation: "th" },
  { area: "Tunisian", abreviation: "ts" },
  { area: "Turkish", abreviation: "tu" },
  { area: "Vietnamese", abreviation: "vm" },
  { area: "Unknown", abreviation: "un" },
];

const Area = ({
  changePage,
  getAreas,
  getMealArea,
  meals: { totalPages, page, areas },
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let f = searchParams.get("filter");
  let p = searchParams.get("page");
  if (!f) f = "portuguese";
  if (!p) p = 1;

  const [filter, setFilter] = useState(f);
  useEffect(() => {
    getAreas();
    changePage(Number(p));
    setSearchParams({
      filter,
      page: p,
    });
    getMealArea(filter);
  }, []);

  const onClick = (e, Area) => {
    e.preventDefault();
    setSearchParams({
      filter: Area,
      page: 1,
    });
    changePage(1);
    setFilter(Area);
    getMealArea(Area);
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
      <div className="area">
        {areas.map((a, i) => (
          <Fragment>
            <div
              className={
                a.strArea && filter === a.strArea.toLowerCase()
                  ? "area-opt category-selected"
                  : "area-opt "
              }
              onClick={e => onClick(e, a.strArea.toLowerCase())}>
              <p key={i}>{a.strArea}</p>
              {a.strArea === "Unknown" ? (
                ""
              ) : (
                <img
                  key={i}
                  src={`https://www.worldometers.info/img/flags/${
                    abreviations.filter(
                      abr => abr.area.toLowerCase() === a.strArea.toLowerCase()
                    )[0].abreviation
                  }-flag.gif`}></img>
              )}
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

Area.propTypes = {
  meals: PropTypes.object.isRequired,
  changeFilter: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  getMealArea: PropTypes.func.isRequired,
  getAreas: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  meals: state.meals,
});

export default connect(mapStateToProps, {
  changePage,
  changeFilter,
  getMealArea,
  getAreas,
})(Area);
