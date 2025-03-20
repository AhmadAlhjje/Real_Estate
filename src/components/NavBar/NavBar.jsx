import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={`navbar ${isOpen ? "open" : ""}`}>
        <div className="navbar-container">
          {/* الحاوية التي تجمع زر القائمة مع الشعار */}
          <div className="navbar-header">
            <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
              ☰
            </button>
            <Link to="/" className="navbar-logo">
              <h1>عقارات</h1>
            </Link>
          </div>

          {/* قائمة التنقل */}
          <ul className={`navbar-menu ${isOpen ? "show" : ""}`}>
            <li>
              <Link to="/contact" className="navbar-link" onClick={() => setIsOpen(false)}>اتصل بنا</Link>
            </li>
            <li>
              <Link to="/about" className="navbar-link" onClick={() => setIsOpen(false)}>عن الموقع</Link>
            </li>
            <li>
              <Link to="/realEstate" className="navbar-link" onClick={() => setIsOpen(false)}>العقارات</Link>
            </li>
            <li>
              <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>الرئيسية</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* لتعديل المسافة بين الشريط والمحتوى عند فتح القائمة */}
      <div className={`content-offset ${isOpen ? "expanded" : ""}`}></div>
    </>
  );
};

export default NavBar;
