import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropertyFilter from "../../components/PropertyFilter/PropertyFilter";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { fetchProperties } from "../../api/Properties"; // استيراد دالة جلب البيانات من الـ API

const RealEstate = () => {
  const [properties, setProperties] = useState([]); // تخزين العقارات المحملة من API
  const [filteredProperties, setFilteredProperties] = useState([]);

  // جلب البيانات من API عند تحميل الصفحة
  useEffect(() => {
    const getProperties = async () => {
      const data = await fetchProperties();
      setProperties(data);
      setFilteredProperties(data); // تعيين البيانات الأولية للفلترة
    };

    getProperties();
  }, []);

  const filterProperties = (filters) => {
    const filtered = properties.filter((prop) => {
      return (
        (filters.propertyType ? prop.type === filters.propertyType : true) &&
        (filters.category ? prop.category === filters.category : true) &&
        (filters.city ? prop.city === filters.city : true) &&
        (filters.livingRooms ? prop.livingRooms === parseInt(filters.livingRooms) : true) &&
        (filters.bathrooms ? prop.bathrooms === parseInt(filters.bathrooms) : true) &&
        (filters.priceRange?.min ? prop.price >= parseInt(filters.priceRange.min) : true) &&
        (filters.priceRange?.max ? prop.price <= parseInt(filters.priceRange.max) : true)
      );
    });
    setFilteredProperties(filtered);
  };

  return (
    <div className="container">
      <PropertyFilter onFilterChange={filterProperties} />
      <div className="row">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((prop) => <PropertyCard key={prop.id} property={prop} />)
        ) : (
          <p className="text-center">لا توجد عقارات متاحة.</p>
        )}
      </div>
    </div>
  );
};

export default RealEstate;
