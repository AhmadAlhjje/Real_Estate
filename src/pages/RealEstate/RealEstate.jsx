import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropertyFilter from "../../components/PropertyFilter/PropertyFilter";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { fetchProperties } from "../../api/RealeStateApi"; 

const RealEstate = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      const data = await fetchProperties(); // استدعاء الـ API للحصول على العقارات
      setProperties(data); // تحديث حالة العقارات بالبيانات المسترجعة
      setFilteredProperties(data); // تعيين البيانات الأولية للفلترة
    };

    getProperties();
  }, []); 

  // تابع لتصفية العقارات بناءً على المعايير المرسلة من مكون PropertyFilter
  const filterProperties = (filters) => {
    const filtered = properties.filter((prop) => {
      return (
        // التحقق من نوع العقار إذا تم تحديده في الفلتر
        (filters.propertyType ? prop.type === filters.propertyType : true) &&
        // التحقق من تصنيف العقار إذا تم تحديده في الفلتر
        (filters.subcategory ? prop.subcategory === filters.subcategory : true) &&
        // التحقق من المدينة إذا تم تحديدها في الفلتر
        (filters.city ? prop.city === filters.city : true) &&
        // التحقق من عدد الغرف إذا تم تحديده في الفلتر
        (filters.rooms ? prop.rooms === parseInt(filters.rooms) : true) &&
        // التحقق من عدد الحمامات إذا تم تحديده في الفلتر
        (filters.bathrooms ? prop.bathrooms === parseInt(filters.bathrooms) : true) &&
        // التحقق من النطاق السعري الأدنى إذا تم تحديده في الفلتر
        (filters.priceRange?.min ? prop.price >= parseInt(filters.priceRange.min) : true) &&
        // التحقق من النطاق السعري الأقصى إذا تم تحديده في الفلتر
        (filters.priceRange?.max ? prop.price <= parseInt(filters.priceRange.max) : true)
      );
    });
    setFilteredProperties(filtered); // تحديث حالة العقارات المصفاة
  };

  return (
    <div className="container">
      <PropertyFilter onFilterChange={filterProperties} />
      {/* عرض العقارات المصفاة أو رسالة عدم توفر عقارات */}
      <div className="row">
        {filteredProperties.length > 0 ? (
          // عرض العقارات باستخدام مكون PropertyCard
          filteredProperties.map((prop) => <PropertyCard key={prop.id} property={prop} />)
        ) : (
          // عرض رسالة إذا لم يتم العثور على عقارات
          <p className="text-center">لا توجد عقارات متاحة.</p>
        )}
      </div>
    </div>
  );
};

export default RealEstate;