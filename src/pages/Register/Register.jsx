import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaUser, FaLock, FaPhone, FaWhatsapp } from "react-icons/fa";
import { registerUser, registerAdmin } from "../../api/UserApi"; 
import "./Register.css";

const Register = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    whatsapp: "",
    role: "user", 
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // تابع لتحديث قيم النموذج عند تغييرها من قبل المستخدم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // تابع للتعامل مع إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // إعادة تعيين رسالة الخطأ
    setSuccess(null); // إعادة تعيين رسالة النجاح

    try {
      let response;
      // التحقق من نوع الحساب (مستخدم عادي أو مسؤول)
      if (formData.role === "user") {
        response = await registerUser(formData);
      } else if (formData.role === "admin") {
        response = await registerAdmin(formData);
      }
      if (response) {
        setSuccess("تم التسجيل بنجاح! سيتم نقلك إلى صفحة تسجيل الدخول...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("حدث خطأ أثناء التسجيل.");
      }
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء التسجيل.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box shadow-lg">
        <h2 className="text-center mb-4">إنشاء حساب جديد</h2>

        {/* عرض رسالة الخطأ إن وجدت */}
        {error && <div className="alert alert-danger">{error}</div>}
        {/* عرض رسالة النجاح إن وجدت */}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* حقل اسم المستخدم */}
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

          {/* حقل كلمة المرور */}
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

          {/* حقل رقم الهاتف */}
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

          {/* حقل رقم الواتساب */}
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

          {/* اختيار نوع الحساب (مستخدم عادي أو مسؤول) */}
          <div className="form-group">
            <label>نوع الحساب</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  type="radio"
                  id="user"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="user" className="form-check-label">مستخدم</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="admin" className="form-check-label">مسؤول</label>
              </div>
            </div>
          </div>

          {/* زر التسجيل لإرسال النموذج */}
          <button type="submit" className="btn btn-primary w-100 mt-3">تسجيل</button>
        </form>
      </div>
    </div>
  );
};

export default Register;