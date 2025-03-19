// components/PropertyList.js
import React, { useState } from "react";
import "./PropertyList.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([
    { id: 1, name: "شقة فاخرة", price: "500,000$", location: "دمشق" },
    { id: 2, name: "فيلا مطلة على البحر", price: "1,200,000$", location: "اللاذقية" },
  ]);

  const handleDelete = (id) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  return (
    <div className="property-list">
      {properties.length === 0 ? (
        <p className="no-content">لا توجد عقارات مضافة بعد.</p>
      ) : (
        properties.map((property) => (
          <div key={property.id} className="property-card">
            <h5>{property.name}</h5>
            <p>📍 {property.location}</p>
            <p>💰 {property.price}</p>
            <div className="property-actions">
              <button className="edit-btn">تعديل</button>
              <button className="delete-btn" onClick={() => handleDelete(property.id)}>حذف</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyList;
