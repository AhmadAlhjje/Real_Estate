import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate
import "./Login.css"; // ملف التنسيقات
import { FaUser, FaLock } from "react-icons/fa";
import { loginUser } from "../../api/UserApi"; // استيراد دالة تسجيل الدخول من authAPI.js

const Login = () => {
  const navigate = useNavigate(); // إنشاء كائن التنقل
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  // تحديث الحقول عند الكتابة
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // إرسال الطلب عند الضغط على زر تسجيل الدخول
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser(formData); // استخدام الدالة من authAPI
      localStorage.setItem("token", data.token); // حفظ التوكن في localStorage
      navigate("/"); // التوجيه إلى الصفحة الرئيسية

    } catch (err) {
      setError(err.message); // عرض رسالة الخطأ
    }
  };

  return (
    <div className="login-container">
      <div className="login-box shadow-lg">
        <h2 className="text-center mb-4">تسجيل الدخول</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* اسم المستخدم */}
          <div className="form-group">
            <label>اسم المستخدم</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input 
                type="text" 
                name="username" 
                className="form-control" 
                placeholder="أدخل اسم المستخدم" 
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* كلمة المرور */}
          <div className="form-group">
            <label>كلمة المرور</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input 
                type="password" 
                name="password" 
                className="form-control" 
                placeholder="أدخل كلمة المرور" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
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
