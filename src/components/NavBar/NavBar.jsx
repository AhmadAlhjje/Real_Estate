import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBuilding ,FaPlusCircle, FaPlus, FaFolder, FaStickyNote, FaTimes,FaHome  } from "react-icons/fa";
import "./NavBar.css";

const NavBar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
      <div className="NavBarIcons"  
        style={{display :"flex", justifyContent:"space-around", width:"100%"}}>
          <Link to="/" className="navbar-logo">
              <h1>عقارات</h1>
        </Link>
        <button className="nav-btn">
          <Link to="/" className="nav-icon-link"><FaHome/></Link>
        </button>

        <button className="nav-btn">
          <Link to="/realEstate" className="nav-icon-link"><FaBuilding  /></Link>
        </button>

        <button className="nav-btn">
          <Link to="/AddProperty" className="nav-icon-link"><FaPlusCircle /></Link>
        </button>

        <button className="nav-btn">
          <FaUser onClick={() => setUserMenuOpen(!userMenuOpen)} />
        </button>
        </div>
{/* 
        <div className={`fab ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaPlus />}
        </div>

        {isOpen && (
          <div className="menu">
            <button className="menu-btn">
              <Link to="/" className="nav-icon-link">الرئيسية</Link>
            </button>
            <button className="menu-btn">
              <Link to="/realEstate" className="nav-icon-link">العقارات</Link>
            </button>
            <button className="menu-btn">
              <Link to="/AddProperty" className="nav-icon-link">اضافة عقار</Link>
            </button>
            <button className="menu-btn">
              <Link to="/AddProperty" className="nav-icon-link"> 
                <FaUser onClick={() => setUserMenuOpen(!userMenuOpen)} />
              </Link>
            </button>
          </div>
        )} */}

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