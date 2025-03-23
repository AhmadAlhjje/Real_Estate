import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate
import "./Login.css"; // ملف التنسيقات
import { FaUser, FaLock } from "react-icons/fa";
import { loginUser, loginAdmin } from "../../api/UserApi"; // استيراد دوال تسجيل الدخول

const Login = () => {
  const navigate = useNavigate(); // إنشاء كائن التنقل
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user", // القيمة الافتراضية هي "مستخدم"
  });
  const [error, setError] = useState(null);

  // تحديث الحقول عند الكتابة
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // إرسال الطلب عند الضغط على زر تسجيل الدخول
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let data;

      if (formData.role === "user") {
        // تسجيل الدخول كمستخدم عادي
        data = await loginUser(formData);
        localStorage.setItem("token", data.token); // حفظ التوكن في localStorage
        navigate("/"); // التوجيه إلى الصفحة الرئيسية
      } else if (formData.role === "admin") {
        // تسجيل الدخول كمسؤول
        data = await loginAdmin(formData);
        localStorage.setItem("token", data.token); // حفظ التوكن في localStorage
        navigate("/dashboard"); // التوجيه إلى صفحة المسؤولين
      }
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء تسجيل الدخول."); // عرض رسالة الخطأ
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

          {/* اختيار نوع الحساب */}
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