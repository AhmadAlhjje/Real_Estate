import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h1>عقارات</h1>
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/contact" className="navbar-link">اتضل بنا</Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link">عن الموقع</Link>
          </li>
          <li>
            <Link to="/realEstate" className="navbar-link">العقارات </Link>
          </li>
          <li>
            <Link to="/" className="navbar-link">الرئيسية </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
