import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBuilding, FaPlusCircle, FaHome } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode'; // استخدم jwtDecode هنا
import "./NavBar.css";

const NavBar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate(); // إضافة useNavigate للتوجيه عند تسجيل الخروج

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const jwtDecodedToken = jwtDecode(token); // فك التوكن
        setUsername(jwtDecodedToken.username); // استخراج اسم المستخدم من التوكن
      } catch (error) {
        console.error("خطأ في فك التوكن:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // مسح التوكن من localStorage
    setUsername(null); // إعادة تعيين اسم المستخدم
    navigate("/"); // التوجيه إلى صفحة تسجيل الدخول
  };

  return (
    <>
      <nav className="navbar">
        <div className="NavBarIcons" style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <Link to="/">
            <h1 className="navbar-logo">عقارات</h1>
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
         

          {/* User Button */}
          <button className="nav-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <FaUser className="nav-icon" />
            {username ? (
              <span className="nav-text">{username}</span> // عرض اسم المستخدم
            ) : (
              <span className="nav-text">تسجيل</span> // عرض "تسجيل" إذا لم يكن هناك توكن
            )}
          </button>
        </div>

        {userMenuOpen && (
          <div className="user-dropdown">
            {username ? (
              // إذا كان هناك توكن، عرض خيار تسجيل الخروج
             <>
              <button onClick={handleLogout} className="user-dropdown-item">
                تسجيل الخروج
              </button>
               <button className=" user-dropdown-item">
               <Link to="/favorites" className=" user-dropdown-item">
                المفضلة
               </Link>
             </button>
             </>
            ) : (
              <>
                <Link to="/login" className="user-dropdown-item">تسجيل الدخول</Link>
                <Link to="/register" className="user-dropdown-item">إنشاء حساب</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
