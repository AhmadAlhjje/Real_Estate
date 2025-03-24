// components/PropertyList.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import "./PropertyList.css";
import { fetchUserProperties, deleteProperty, updateProperty } from "../../api/RealeStateApi"; // استيراد الدوال الجديدة
import { getUserIdFromToken } from "../../api/api";

const PropertyList = () => {
  const [properties, setProperties] = useState([]); // لتخزين بيانات العقارات
  const [loading, setLoading] = useState(true); // لتحديد حالة التحميل
  const [error, setError] = useState(null); // لتخزين رسالة الخطأ
  const [editFormData, setEditFormData] = useState(null); // لتخزين بيانات النموذج الخاص بالتعديل

  // دالة لجلب بيانات العقارات عند تحميل المكون
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const userId = getUserIdFromToken(); // استخراج معرّف المستخدم من التوكن
        if (!userId) {
          setError("يجب تسجيل الدخول أولاً.");
          setLoading(false);
          return;
        }

        const data = await fetchUserProperties(userId); // جلب العقارات الخاصة بالمستخدم
        setProperties(data);
      } catch (err) {
        setError(err.message || "حدث خطأ أثناء جلب بيانات العقارات.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // دالة حذف العقار
  const handleDelete = async (id) => {
    try {
      if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا العقار؟")) {
        await deleteProperty(id); // استدعاء دالة الحذف من API
        setProperties(properties.filter((property) => property.id !== id)); // تحديث القائمة بعد الحذف
      }
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء حذف العقار.");
    }
  };

  // دالة فتح نموذج التعديل
  const handleEdit = (property) => {
    setEditFormData({
      id: property.id,
      title: property.title,
      type: property.type,
      subcategory: property.subcategory,
      city: property.city,
      price: property.price,
      rooms: property.rooms,
      bathrooms: property.bathrooms,
      description: property.description,
      latitude: property.latitude,
      longitude: property.longitude,
      area: property.area,
      rent_type: property.rent_type || "",
    });
  };

  // دالة تحديث بيانات النموذج
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value.trim() !== "" ? value : null, // تجاهل القيم الفارغة
    }));
  };

  // دالة حفظ التعديلات وإرسالها إلى الـ API
  const handleSave = async () => {
    try {
      if (!editFormData) return;
  
      // تحضير البيانات للإرسال
      const formData = new FormData();
  
      // إضافة الحقول المعدلة فقط
      for (const key in editFormData) {
        if (key === "images") continue; // تجاهل الصور
        if (editFormData[key] !== null && editFormData[key] !== undefined) {
          formData.append(key, editFormData[key]);
        }
      }
  
      console.log("Sending Data:", Object.fromEntries(formData)); // فحص البيانات المرسلة
  
      // إرسال البيانات المعدلة إلى الـ API
      const updatedProperty = await updateProperty(editFormData.id, formData);
      console.log("Server Response:", updatedProperty); // فحص الاستجابة من الخادم
  
      // تحديث قائمة العقارات
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.id === editFormData.id
            ? { ...property, ...updatedProperty } // استخدام القيم الواردة من الخادم
            : property
        )
      );
  
      console.log("Updated Properties:", properties); // فحص البيانات المحدثة
  
      // إغلاق النموذج بعد الحفظ
      setEditFormData(null);
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء تعديل العقار.");
    }
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
    <div>
      {/* نموذج التعديل */}
      {editFormData && (
        <div className="edit-form-overlay">
          <div className="edit-form">
            <h3>تعديل العقار</h3>

            {/* حقول النموذج */}
            <input
              type="text"
              name="title"
              value={editFormData.title || ""}
              onChange={handleChange}
              placeholder="العنوان"
            />
            <input
              type="text"
              name="type"
              value={editFormData.type || ""}
              onChange={handleChange}
              placeholder="النوع"
            />
            <input
              type="text"
              name="subcategory"
              value={editFormData.subcategory || ""}
              onChange={handleChange}
              placeholder="الفئة الفرعية"
            />
            <input
              type="text"
              name="city"
              value={editFormData.city || ""}
              onChange={handleChange}
              placeholder="المدينة"
            />
            <input
              type="number"
              name="price"
              value={editFormData.price || ""}
              onChange={handleChange}
              placeholder="السعر"
            />
            <input
              type="number"
              name="rooms"
              value={editFormData.rooms || ""}
              onChange={handleChange}
              placeholder="عدد الغرف"
            />
            <input
              type="number"
              name="bathrooms"
              value={editFormData.bathrooms || ""}
              onChange={handleChange}
              placeholder="عدد الحمامات"
            />
            <textarea
              name="description"
              value={editFormData.description || ""}
              onChange={handleChange}
              placeholder="الوصف"
            />
            <input
              type="number"
              name="latitude"
              value={editFormData.latitude || ""}
              onChange={handleChange}
              placeholder="خط العرض"
            />
            <input
              type="number"
              name="longitude"
              value={editFormData.longitude || ""}
              onChange={handleChange}
              placeholder="خط الطول"
            />
            <input
              type="number"
              name="area"
              value={editFormData.area || ""}
              onChange={handleChange}
              placeholder="المساحة"
            />
            <input
              type="text"
              name="rent_type"
              value={editFormData.rent_type || ""}
              onChange={handleChange}
              placeholder="نوع الإيجار"
            />

            {/* زر الحفظ والإلغاء */}
            <button onClick={handleSave} className="save-btn">
              حفظ
            </button>
            <button onClick={() => setEditFormData(null)} className="cancel-btn">
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* قائمة العقارات */}
      <div className="property-list">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <img
              src={
                property.images &&
                typeof property.images === "string" &&
                property.images.trim() !== "" &&
                Array.isArray(JSON.parse(property.images)) &&
                JSON.parse(property.images).length > 0
                  ? JSON.parse(property.images)[0]
                  : "/default-image.jpg" // صورة افتراضية إذا لم تكن هناك صور
              }
              alt={property.title}
              className="property-image"
            />
            <div className="property-details">
              <h5>{property.title}</h5>
              <p>📍 {property.city}</p>
              <p>💰 {parseFloat(property.price).toLocaleString()} $</p>
              <p>🛏 {property.rooms} غرف | 🚿 {property.bathrooms} حمامات</p>
              <p>📅 {new Date(property.addedDate).toLocaleDateString()}</p>
            </div>
            <div className="property-actions">
              <button className="edit-btn" onClick={() => handleEdit(property)}>
                <FaEdit /> {/* إضافة أيقونة القلم */}
              </button>
              <button className="delete-btn" onClick={() => handleDelete(property.id)}>
                <FaRegTrashAlt /> {/* إضافة أيقونة سلة المهملات */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;