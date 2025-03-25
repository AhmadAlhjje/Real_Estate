import React, { useState, useEffect } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { fetchUserProperties, deleteProperty, updateProperty } from "../../api/RealeStateApi";
import { getUserIdFromToken } from "../../api/api";
import EditPropertyForm from "../../components/EditPropertyForm/EditPropertyForm"; 
import { BASE_URL} from '../../api/api'
import "./PropertyList.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]); // لتخزين بيانات العقارات
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
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
        if (editFormData[key] !== null && editFormData[key] !== undefined) {
          formData.append(key, editFormData[key]);
        }
      }

      // إرسال البيانات المعدلة إلى الـ API
      const updatedProperty = await updateProperty(editFormData.id, Object.fromEntries(formData));

      // تحديث قائمة العقارات
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.id === editFormData.id
            ? { ...property, ...updatedProperty } // استخدام القيم الواردة من الخادم
            : property
        )
      );

      // إغلاق النموذج بعد الحفظ
      setEditFormData(null);
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء تعديل العقار.");
    }
  };

  if (loading) {
    return <p className="no-content">جاري التحميل...</p>;
  }

  if (error) {
    return <p className="no-content text-danger">{error}</p>;
  }

  if (properties.length === 0) {
    return <p className="no-content">لا توجد عقارات مضافة بعد.</p>;
  }

  return (
    <div>
      {/* استدعاء مكون نموذج التعديل إذا كان هناك بيانات للتعديل */}
      {editFormData && (
        <EditPropertyForm
          editFormData={editFormData}
          handleChange={handleChange}
          handleSave={handleSave}
          cancelEdit={() => setEditFormData(null)}
        />
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
                  ? `${BASE_URL}${JSON.parse(property.images)[0]}`
                  : "/default-image.jpg" // صورة افتراضية إذا لم تكن هناك صور
              }
              alt={property.title}
              className="property-image"
              style={{ height: "200px", objectFit: "cover" }}
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