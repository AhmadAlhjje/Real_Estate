import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// استيراد أيقونة مخصصة لإصلاح مشكلة عرض الأيقونات الافتراضية في Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// إنشاء أيقونة مخصصة لموقع الخريطة باستخدام مكتبة Leaflet
const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MapComponent = ({ lat, lng, title }) => {
    return (
        <MapContainer center={[lat, lng]} zoom={15} style={{ height: "300px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lng]} icon={customIcon}>
                <Popup>
                    <strong>{title}</strong>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;