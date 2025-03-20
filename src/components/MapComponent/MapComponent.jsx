import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// استيراد أيقونة مخصصة لإصلاح مشكلة عرض الأيقونات الافتراضية في Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// إنشاء أيقونة مخصصة لموقع الخريطة باستخدام مكتبة Leaflet
const customIcon = new L.Icon({
    // الرابط الخاص بالصورة التي سيتم استخدامها كأيقونة للمؤشر (Marker)
    iconUrl: markerIcon, 
    // الرابط الخاص بالصورة الظلية التي سيتم استخدامها تحت الأيقونة (Shadow of the marker)
    shadowUrl: markerShadow,
    // حجم الأيقونة بالبيكسل. هنا نحدد عرض الأيقونة وارتفاعها (عرض: 25px، ارتفاع: 41px)
    iconSize: [25, 41],
    // تحديد النقطة التي سيتم ربط الأيقونة بها على الخريطة. 
    // النقطة هذه هي النقطة التي ستتواجد عندها الأيقونة على الخريطة. (نصف عرض الأيقونة من اليسار، والارتفاع الكامل من الأسفل)
    iconAnchor: [12, 41],
    // تحديد المكان الذي سيظهر فيه النص المنبثق (popup) بالنسبة للأيقونة.
    // في هذه الحالة، يظهر النص المنبثق فوق الأيقونة بمقدار 34 بيكسل للأسفل.
    popupAnchor: [1, -34],
    // حجم الظل بالبيكسل. هذه هي الأبعاد الخاصة بالصورة الظلية التي ستكون تحت الأيقونة.
    shadowSize: [41, 41],
  });
  

// const properties = [
//   {
//     id: 1,
//     title: "مشروع جاهز للتسليم",
//     city: "Aleppo",
//     latitude: 36.2021,
//     longitude: 37.1343,
//   },
//   {
//     id: 2,
//     title: "مشروع جاهز للتسليم",
//     city: "Aleppo",
//     latitude: 36.215,
//     longitude: 37.1598,
//   },
//   {
//     id: 3,
//     title: "مشروع جاهز للتسليم",
//     city: "Aleppo",
//     latitude: 36.1802,
//     longitude: 37.1225,
//   },
//   {
//     id: 4,
//     title: "مشروع قيد الإنشاء",
//     city: "Damascus",
//     latitude: 33.5102,
//     longitude: 36.2913,
//   },
//   {
//     id: 5,
//     title: "فيلا فاخرة",
//     city: "Latakia",
//     latitude: 35.5193,
//     longitude: 35.7811,
//   },
//   {
//     id: 6,
//     title: "شقة في وسط المدينة",
//     city: "Homs",
//     latitude: 34.7306,
//     longitude: 36.7098,
//   },
// ];

const MapComponent = ({ lat, lng ,title}) => {
    return (
      <MapContainer center={[lat, lng]} zoom={15} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            <strong> ${title}</strong>
          </Popup>
        </Marker>
      </MapContainer>
    );
  };
  
  export default MapComponent;
