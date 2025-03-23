// components/PropertyList.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import "./PropertyList.css";
import { fetchUserProperties } from "../../api/RealeStateApi";
import { getUserIdFromToken } from "../../api/api";

const PropertyList = () => {
  const [properties, setProperties] = useState([]); // لتخزين بيانات العقارات
  const [loading, setLoading] = useState(true); // لتحديد حالة التحميل
  const [error, setError] = useState(null); // لتخزين رسالة الخطأ

  // دالة لجلب بيانات العقارات عند تحميل المكون
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const userId = getUserIdFromToken(); // استخراج معرّف المستخدم من التوكن
        if (!userId) {
          setError("يجب تسجيل الدخول أولاً.");
          setLoading(false);
          console.log(userId)
          return;
        }

        const data = await fetchUserProperties(userId); // جلب العقارات الخاصة بالمستخدم
        setProperties(data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("حدث خطأ أثناء جلب بيانات العقارات.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // دالة حذف العقار
  const handleDelete = (id) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  // عرض مؤشر التحميل إذا كانت البيانات قيد التحميل
  if (loading) {
    return <p className="no-content">جاري التحميل...</p>;
  }

  // عرض رسالة الخطأ إذا حدث خطأ أثناء جلب البيانات
  if (error) {
    return <p className="no-content text-danger">{error}</p>;
  }

  // إذا لم يتم العثور على عقارات
  if (properties.length === 0) {
    return <p className="no-content">لا توجد عقارات مضافة بعد.</p>;
  }

  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          <img src={JSON.parse(property.images)[0]} alt={property.title} className="property-image" />
          <div className="property-details">
            <h5>{property.title}</h5>
            <p>📍 {property.city}</p>
            <p>💰 {parseFloat(property.price).toLocaleString()} $</p>
            <p>🛏 {property.rooms} غرف | 🚿 {property.bathrooms} حمامات</p>
            <p>📅 {new Date(property.addedDate).toLocaleDateString()}</p>
          </div>
          <div className="property-actions">
            <button className="edit-btn">
              <FaEdit /> {/* إضافة أيقونة القلم */}
            </button>
            <button className="delete-btn" onClick={() => handleDelete(property.id)}>
              <FaRegTrashAlt /> {/* إضافة أيقونة سلة المهملات */}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;