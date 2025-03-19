import React from "react";
import "./Register.css"; // ملف التنسيقات المخصصة
import { FaUser, FaLock, FaPhone, FaWhatsapp } from "react-icons/fa";

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-box shadow-lg">
        <h2 className="text-center mb-4">إنشاء حساب جديد</h2>
        <form>
          {/* اسم المستخدم */}
          <div className="form-group">
            <label>اسم المستخدم</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input type="text" className="form-control" placeholder="أدخل اسم المستخدم" required />
            </div>
          </div>

          {/* كلمة المرور */}
          <div className="form-group">
            <label>كلمة المرور</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input type="password" className="form-control" placeholder="أدخل كلمة المرور" required />
            </div>
          </div>

          {/* رقم الهاتف */}
          <div className="form-group">
            <label>رقم الهاتف</label>
            <div className="input-group">
              <span className="input-group-text"><FaPhone /></span>
              <input type="tel" className="form-control" placeholder="أدخل رقم الهاتف" required />
            </div>
          </div>

          {/* رقم الواتساب */}
          <div className="form-group">
            <label>رقم الواتساب</label>
            <div className="input-group">
              <span className="input-group-text"><FaWhatsapp /></span>
              <input type="tel" className="form-control" placeholder="أدخل رقم الواتساب" required />
            </div>
          </div>

          {/* زر التسجيل */}
          <button type="submit" className="btn btn-primary w-100 mt-3">تسجيل</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
