import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// استيراد أيقونة مخصصة للمؤشر
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// إنشاء أيقونة مخصصة للمؤشر
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// مكون لتحديد الموقع عند النقر على الخريطة
const LocationMarker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect({ lat, lng }); // إرسال الإحداثيات للمكون الأب
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>الموقع المحدد</Popup>
    </Marker>
  );
};

export default LocationMarker;