import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from "../../components/Filter/Filter";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { fetchProperties } from "../../api/Properties"; // استيراد دالة جلب البيانات

const HomePage = () => {
  const [properties, setProperties] = useState([]); // تخزين العقارات المسترجعة
  const [filterType, setFilterType] = useState("all"); // تخزين نوع الفلتر

  useEffect(() => {
    const getProperties = async () => {
      const data = await fetchProperties();
      setProperties(data); 
    };
    getProperties();
  }, []);

  const handleFilter = (type) => {
    setFilterType(type);
  };

  return (
    <div className="container mt-4" dir="rtl">
      <h2 className="text-center mb-4">العقارات المتاحة</h2>
      <Filter onFilter={handleFilter} />
      
      <h2 className="text-start" style={{ marginTop: "60px" }}>أكثر العقارات مشاهدة</h2>
      <div className="row mt-4">
        {properties
          .filter((prop) => filterType === "all" || prop.type === filterType)
          .sort((a, b) => b.views - a.views)
          .slice(0, 3)
          .map((property) => (
            <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <h2 className="text-start" style={{ marginTop: "60px" }}>أحدث العقارات</h2>
      <div className="row mt-4 mb-4">
        {properties
          .filter((prop) => filterType === "all" || prop.type === filterType)
          .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate)) // التأكد من مقارنة التواريخ بشكل صحيح
          .slice(0, 3)
          .map((property) => (
            <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
