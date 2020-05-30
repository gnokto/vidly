import React from "react";

import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Blockbuster
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-exopanded="false"
        aria-label="Toggle navigation"
      />
      <div className="navbar-nav">
        <NavLink className="nav-link nav-item" to="/movies">
          Movies
        </NavLink>
        <NavLink className="nav-link nav-item" to="/customers">
          Customers
        </NavLink>
        <NavLink className="nav-link nav-item" to="/rentals">
          Rentals
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
