import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* القسم الأول - روابط الموقع */}
        <div className="footer-links">
          <h3>روابط سريعة</h3>
          <ul>
            <li><Link to="/">الرئيسية</Link></li>
            <li><Link to="/about">عن الموقع</Link></li>
            <li><Link to="/properties">العقارات</Link></li>
            <li><Link to="/contact">اتصل بنا</Link></li>
          </ul>
        </div>

        {/* القسم الثاني - معلومات الاتصال */}
        <div className="footer-contact">
          <h3>اتصل بنا</h3>
          <p>📍 العنوان: دمشق، سوريا</p>
          <p>📞 الهاتف: +963 912 345 678</p>
          <p>✉️ البريد: info@example.com</p>
        </div>

        {/* القسم الثالث - مواقع التواصل */}
        <div className="footer-social">
          <h3>تابعنا على</h3>
          <div className="social-icons">
            <a href="#" className="icon facebook"><FaFacebookF /></a>
            <a href="#" className="icon instagram"><FaInstagram /></a>
            <a href="#" className="icon youtube"><FaYoutube /></a>
            <a href="#" className="icon linkedin"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* الحقوق */}
      <div className="footer-bottom">
        <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - موقع العقارات</p>
      </div>
    </footer>
  );
};

export default Footer;
