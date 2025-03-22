import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate
import "./Register.css"; // ملف التنسيقات المخصصة
import { FaUser, FaLock, FaPhone, FaWhatsapp } from "react-icons/fa";
import { registerUser } from "../../api/UserApi"; // استيراد دالة التسجيل

const Register = () => {
  const navigate = useNavigate(); // إنشاء كائن التنقل
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    whatsapp: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await registerUser(formData); 
      setSuccess("تم التسجيل بنجاح! سيتم نقلك إلى صفحة تسجيل الدخول...");
      setTimeout(() => {
        navigate("/login"); // النقل إلى صفحة تسجيل الدخول بعد ثانيتين
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box shadow-lg">
        <h2 className="text-center mb-4">إنشاء حساب جديد</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

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

          {/* رقم الهاتف */}
          <div className="form-group">
            <label>رقم الهاتف</label>
            <div className="input-group">
              <span className="input-group-text"><FaPhone /></span>
              <input 
                type="tel" 
                name="phone" 
                className="form-control" 
                placeholder="أدخل رقم الهاتف" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* رقم الواتساب */}
          <div className="form-group">
            <label>رقم الواتساب</label>
            <div className="input-group">
              <span className="input-group-text"><FaWhatsapp /></span>
              <input 
                type="tel" 
                name="whatsapp" 
                className="form-control" 
                placeholder="أدخل رقم الواتساب" 
                value={formData.whatsapp} 
                onChange={handleChange} 
                required 
              />
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
