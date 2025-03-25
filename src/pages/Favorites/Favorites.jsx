import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { fetchProperties } from "../../api/RealeStateApi"; 

const Favorites = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      const data = await fetchProperties(); // استدعاء الـ API للحصول على العقارات
      setFilteredProperties(data); // تعيين البيانات الأولية للفلترة
    };

    getProperties();
  }, []); 

 

  return (
    <div className="container">
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

export default Favorites;