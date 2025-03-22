import React from "react";
import { useParams, useLocation } from "react-router-dom";
import MapComponent from "../../components/MapComponent/MapComponent";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaExpand } from "react-icons/fa";
import "./PropertyDetails.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const properties = [
  {
    id: 2,
    title: "مشروع جاهز للتسليم",
    type: "آجار",
    category: "شقة",
    subCategory: "منزل",
    city: "Aleppo",
    area: 120,
    price: 275000,
    rooms: 3,
    bathrooms: 2,
    livingRooms: 3,
    rentType: "سنوي",
    images: ["/s6.jpg", "/s7.jpg"],
    video: "public/video2.mp4",
    description: "شقة جديدة بتصميم حديث وإطلالة رائعة.",
    views: 250,
    latitude: 36.215,
    longitude: 37.1598,
    addedDate: new Date("2025-03-02T12:00:00"),
  },
];

const PropertyDetails = () => {
  const { id } = useParams(); // استخراج الـ id من الرابط
  const location = useLocation(); // استخراج الحالة (state) من الرابط

  // الحصول على العقار من الحالة أو البحث باستخدام الـ id
  const property = location.state?.property || properties.find((p) => p.id === parseInt(id));

  if (!property) return <h2 className="text-center">العقار غير موجود</h2>;

  // تحويل الصور إلى الصيغة المطلوبة من مكتبة react-image-gallery
  const images = property.images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  // تأثيرات الحركة
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="container mt-5">
      {/* عنوان العقار والسعر */}
      <motion.div
        className="d-flex justify-content-between align-items-center mb-5"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <h2 className="fw-bold text-dark">{property.title}</h2>
        <h4 className="text-success fw-bold">
          USD {property.price.toLocaleString()}
        </h4>
      </motion.div>

      {/* القسم الأيمن - الفيديو والخريطة */}
      <div className="row mt-4 mb-4">
        <div className="col-md-4 d-flex flex-column gap-3">
          {/* صندوق الفيديو */}
          <motion.div
            className="video-box"
            whileHover={{ scale: 1.02 }}
            onClick={() => window.open(property.video, "_blank")}
          >
            <img
              src={property.images[0]}
              alt="Video Thumbnail"
              className="w-100 h-100 object-fit-cover"
            />
            <div className="video-overlay">▶️ مشاهدة جولة بالفيديو</div>
          </motion.div>

          {/* صندوق الخريطة */}
          <motion.div className="map-box" whileHover={{ scale: 1.02 }}>
            <MapComponent
              lat={property.latitude}
              lng={property.longitude}
              title={property.title}
            />
          </motion.div>
        </div>

        {/* القسم الأيسر - عرض الصور باستخدام ImageGallery */}
        <div className="col-md-8 mt-4 mt-md-0">
          <motion.div className="gallery-box" whileHover={{ scale: 1.02 }}>
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={true}
              useBrowserFullscreen={true}
              showThumbnails={true}
              slideDuration={450}
              slideInterval={2000}
              additionalClass="custom-gallery"
              renderFullscreenButton={(onClick) => (
                <button className="fullscreen-button" onClick={onClick}>
                  <FaExpand size={20} />
                </button>
              )}
            />
          </motion.div>
        </div>
      </div>

      {/* تفاصيل العقار */}
      <motion.div
        className="details-section mt-4"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        {/* وصف العقار */}
        <div className="description-box">
          <h4 className="section-title">وصف العقار</h4>
          <h4>{property.description}</h4>
        </div>

        {/* التفاصيل الأساسية */}
        <div className="basic-details-box">
          <h4 className="section-title">المعلومات الأساسية</h4>
          <div className="row">
            {[
              { icon: "🏠", label: " النوع: ", value: property.type },
              { icon: "🏢", label: "الفئة: ", value: property.category },
              { icon: "📍", label: "المدينة: ", value: property.city },
              { icon: "📏", label: "المساحة: ", value: `${property.area} متر مربع` },
              { icon: "🛏️", label: "غرف النوم: ", value: property.rooms },
              { icon: "🚿", label: "الحمام: ", value: property.bathrooms },
              { icon: "🛋️", label: "غرف المعيشة: ", value: property.livingRooms },
              { icon: "📅", label: "نوع الإيجار: ", value: property.rentType },
            ].map(({ icon, label, value }, index) => (
              <div key={index} className="col-6 detail-item">
                <span className="icon">{icon} </span>
                <strong> {label}</strong> {value}
              </div>
            ))}
          </div>
        </div>

        {/* إحصائيات العقار */}
        <div className="stats-box">
          <h4 className="section-title">إحصائيات العقار</h4>
          <ul className="list-unstyled">
            <li>
              <strong>عدد المشاهدات:</strong> {property.views}
            </li>
            <li>
              <strong>تاريخ الإضافة:</strong> {property.addedDate.toLocaleDateString()}
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyDetails;