import React from "react";
import "./Login.css"; // ملف التنسيقات
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box shadow-lg">
        <h2 className="text-center mb-4">تسجيل الدخول</h2>
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

          {/* زر تسجيل الدخول */}
          <button type="submit" className="btn btn-primary w-100 mt-3">تسجيل الدخول</button>
        </form>

        {/* رابط نسيان كلمة المرور */}
        <div className="text-center mt-3">
          <a href="#" className="forgot-password">نسيت كلمة المرور؟</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
