import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBuilding, FaPlusCircle, FaPlus, FaHome } from "react-icons/fa";
import "./NavBar.css";

const NavBar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="NavBarIcons" style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <Link to="/" className="navbar-logo">
            <h1>عقارات</h1>
          </Link>
          
          {/* Home Button */}
          <button className="nav-btn">
            <Link to="/" className="nav-icon-link">
              <FaHome className="nav-icon" />
              <span className="nav-text">الرئيسية</span>
            </Link>
          </button>

          {/* Real Estate Button */}
          <button className="nav-btn">
            <Link to="/realEstate" className="nav-icon-link">
              <FaBuilding className="nav-icon" />
              <span className="nav-text">عقارات</span>
            </Link>
          </button>

          {/* Add Property Button */}
          <button className="nav-btn">
            <Link to="/AddProperty" className="nav-icon-link">
              <FaPlusCircle className="nav-icon" />
              <span className="nav-text"> اضافة عقار</span>
            </Link>
          </button>

          {/* <button className="nav-btn">
            <Link to="/a" className="nav-icon-link">
              <FaPlusCircle className="nav-icon" />
              <span className="nav-text"> مزادات </span>
            </Link>
          </button> */}

          {/* User Button */}
          <button className="nav-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <FaUser className="nav-icon" />
            <span className="nav-text">تسجيل</span>
          </button>
        </div>

        {userMenuOpen && (
          <div className="user-dropdown">
            <Link to="/login" className="user-dropdown-item">تسجيل الدخول</Link>
            <Link to="/register" className="user-dropdown-item">إنشاء حساب</Link>
            <Link to="/favorites" className="user-dropdown-item">المفضلات</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
