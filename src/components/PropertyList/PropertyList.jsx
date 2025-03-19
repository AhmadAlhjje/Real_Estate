// components/PropertyList.js
import React, { useState } from "react";
import "./PropertyList.css";

const initialProperties = [
    {
      id: 1,
      title: "مشروع جاهز للتسليم",
      type: "آجار",
      category: "شقة",
      subCategory: "منزل",
      city: "Aleppo",
      area: 120,
      price: 100000,
      rooms: 3,
      bathrooms: 2,
      livingRooms:5,
      rentType: "شهري",
      images: ["public/s1.jpg", "public/s2.jpg"],
      video: "public/video1.mp4",
      description: "شقة مميزة مع إطلالة جميلة قريبة من جميع الخدمات.",
      views: 200,
      latitude: 36.2021,
      longitude: 37.1343,
      addedDate: new Date("2025-03-01T12:00:00")
    },
    {
      id: 2,
      title: "مشروع جاهز للتسليم",
      type: "آجار",
      category: "شقة",
      subCategory: "منزل",
      city: "Aleppo",
      area: 120,
      price: 100000,
      rooms: 3,
      bathrooms: 2,
      livingRooms:3,
      rentType: "سنوي",
      images: ["public/s2.jpg", "public/s3.jpg"],
      video: "public/video2.mp4",
      description: "شقة جديدة بتصميم حديث وإطلالة رائعة.",
      views: 250,
      latitude: 36.2150,
      longitude: 37.1598,
      addedDate: new Date("2025-03-02T12:00:00")
    },
    {
      id: 3,
      title: "مشروع جاهز للتسليم",
      type: "آجار",
      category: "شقة",
      subCategory: "منزل",
      city: "Aleppo",
      area: 120,
      price: 100000,
      rooms: 3,
      bathrooms: 2,
      livingRooms:1,
      rentType: "شهري",
      images: ["public/s3.jpg", "public/s4.jpg"],
      video: "public/video3.mp4",
      description: "شقة مجهزة بالكامل مع أثاث عصري.",
      views: 180,
      latitude: 36.1802,
      longitude: 37.1225,
      addedDate: new Date("2025-03-03T12:00:00")
    },
    {
      id: 4,
      title: "مشروع قيد الإنشاء",
      type: "شراء",
      category: "فيلا",
      subCategory: "قصر",
      city: "Damascus",
      area: 300,
      price: 250000,
      rooms: 5,
      bathrooms: 4,
      livingRooms:4,
      rentType: null,
      images: ["public/s4.jpg", "public/s5.jpg"],
      video: "public/video4.mp4",
      description: "فيلا فاخرة بتصميم حديث مع مسبح وحديقة واسعة.",
      views: 150,
      latitude: 33.5102,
      longitude: 36.2913,
      addedDate: new Date("2025-03-04T12:00:00")
    },
    {
      id: 5,
      title: "فيلا فاخرة",
      type: "مشاريع",
      category: "فيلا",
      subCategory: "منزل",
      city: "Latakia",
      area: 500,
      price: 500000,
      rooms: 6,
      bathrooms: 5,
      livingRooms:2,
      rentType: null,
      images: ["public/s5.jpg", "public/s6.jpg"],
      video: "public/video5.mp4",
      description: "فيلا مطلة على البحر مع كافة وسائل الراحة.",
      views: 300,
      latitude: 35.5193,
      longitude: 35.7811,
      addedDate: new Date("2025-03-05T12:00:00")
    },
    {
      id: 6,
      title: "شقة في وسط المدينة",
      type: "آجار",
      category: "شقة",
      subCategory: "مكتب",
      city: "Homs",
      area: 140,
      price: 180000,
      rooms: 4,
      bathrooms: 3,
      livingRooms:1,
      rentType: "شهري",
      images: ["public/s6.jpg", "public/s7.jpg"],
      video: "public/video6.mp4",
      description: "شقة مثالية للعائلات في وسط المدينة بالقرب من المواصلات.",
      views: 400,
      latitude: 34.7306,
      longitude: 36.7098,
      addedDate: new Date("2025-03-06T12:00:00")
    }
  ];

const PropertyList = () => {
  const [properties, setProperties] = useState(initialProperties);

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
            <img src={property.images[0]} alt={property.title} className="property-image" />
            <div className="property-details">
              <h5>{property.title}</h5>
              <p>📍 {property.city}</p>
              <p>💰 {property.price.toLocaleString()} $</p>
              <p>🛏 {property.rooms} غرف | 🚿 {property.bathrooms} حمامات</p>
              <p>📅 {property.addedDate.toLocaleDateString()}</p>
            </div>
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
