import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = ({}) => {
  const navigate = useNavigate();
  const onClick = filter => {
    if (filter === "all") navigate(`/`);
    else navigate(`/${filter}`);
  };
  const [toggle, setToggle] = useState(false);
  const toggler = e => {
    e.preventDefault();
    setToggle(!toggle);
  };
  return (
    <div className="navbar">
      <div className="navbar-header">
        <button className="logo-btn" onClick={() => onClick("all")}>
          Recipes
        </button>
        <i className="bi bi-list" onClick={e => toggler(e)}></i>
      </div>
      <div className={toggle ? "navbar-item" : ""}>
        <button className="type-btn" onClick={() => onClick("name")}>
          Name
        </button>
      </div>
      <div className={toggle ? "navbar-item" : ""}>
        <button className="type-btn" onClick={() => onClick("category")}>
          Category
        </button>
      </div>
      <div className={toggle ? "navbar-item" : ""}>
        <button className="type-btn" onClick={() => onClick("area")}>
          Area
        </button>
      </div>
      <div className={toggle ? "navbar-item" : ""}>
        <button className="type-btn" onClick={() => onClick("ingredient")}>
          Ingredient
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
