import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
              <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>الرئيسية</Link>
            </li>
            <li>
              <Link to="/realEstate" className="navbar-link" onClick={() => setIsOpen(false)}>العقارات</Link>
            </li>
            <li>
              <Link to="/AddProperty" className="navbar-link" onClick={() => setIsOpen(false)}>إضافة عقار</Link>
            </li>
            <li>
              <Link to="/contact" className="navbar-link" onClick={() => setIsOpen(false)}>اتصل بنا</Link>
            </li>
          </ul>

          {/* أيقونة المستخدم */}
          <div className="user-menu">
            <FaUserCircle 
              size={30} 
              className="user-icon" 
              onClick={() => setUserMenuOpen(!userMenuOpen)} 
            />
            {userMenuOpen && (
              <div className="user-dropdown">
                <Link to="/login" className="user-dropdown-item">تسجيل الدخول</Link>
                <Link to="/signup" className="user-dropdown-item">إنشاء حساب</Link>
                <Link to="/favorites" className="user-dropdown-item">المفضلات</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* لتعديل المسافة بين الشريط والمحتوى عند فتح القائمة */}
      <div className={`content-offset ${isOpen ? "expanded" : ""}`}></div>
    </>
  );
};

export default NavBar;
