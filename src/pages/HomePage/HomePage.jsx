import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from "../../components/Filter/Filter";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { fetchProperties } from "../../api/RealeStateApi"; 

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filterType, setFilterType] = useState("all");

  // تابع يتم تنفيذه عند تحميل الصفحة لجلب بيانات العقارات من الـ API
  useEffect(() => {
    const getProperties = async () => {
      const data = await fetchProperties(); // استدعاء الـ API للحصول على العقارات
      setProperties(data); // تحديث حالة العقارات بالبيانات المسترجعة
    };
    getProperties();
  }, []); 

  // تابع لتحديث نوع الفلتر عند اختياره من قبل المستخدم
  const handleFilter = (type) => {
    setFilterType(type); // تحديث نوع الفلتر بناءً على الاختيار
  };

  return (
    <div className="container mt-4" dir="rtl">
      <h2 className="text-center mb-4">العقارات المتاحة</h2>
      
      {/* مكون الفلتر الذي يسمح للمستخدم بتصفية العقارات بناءً على النوع */}
      <Filter onFilter={handleFilter} />
      
      <h2 className="text-start" style={{ marginTop: "60px", fontSize:"30px" , fontWeight:"bolder"}}>
        أكثر العقارات مشاهدة
      </h2>
      <div className="row mt-4">
        {properties
          // تصفية العقارات بناءً على نوع الفلتر
          .filter((prop) => filterType === "all" || prop.type === filterType)
          // ترتيب العقارات حسب عدد المشاهدات من الأعلى إلى الأقل
          .sort((a, b) => b.views - a.views)
          // عرض أول 3 عقارات فقط
          .slice(0, 3)
          .map((property) => (
            <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* عرض أحدث العقارات */}
      <h2 className="text-start" style={{ marginTop: "60px", fontSize:"30px" , fontWeight:"bolder"}}>
        أحدث العقارات
      </h2>
      <div className="row mt-4 mb-4">
        {properties
          // تصفية العقارات بناءً على نوع الفلتر
          .filter((prop) => filterType === "all" || prop.type === filterType)
          // ترتيب العقارات حسب تاريخ الإضافة من الأحدث إلى الأقدم
          .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
          // عرض أول 3 عقارات فقط
          .slice(0, 3)
          .map((property) => (
            <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;