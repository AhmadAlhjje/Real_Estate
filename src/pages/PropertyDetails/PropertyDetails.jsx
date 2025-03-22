import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapComponent from "../../components/MapComponent/MapComponent";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaExpand } from "react-icons/fa";
import "./PropertyDetails.css";
import { getPropertyById } from '../../api/RealeStateApi';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const PropertyDetails = () => {
  const { id } = useParams(); // استخراج الـ id من الرابط
  const [property, setProperty] = useState(null); // لتخزين بيانات العقار
  const [loading, setLoading] = useState(true); // لتحديد حالة التحميل
  const [error, setError] = useState(null); // لتخزين رسالة الخطأ

  // دالة لجلب بيانات العقار من الـ API
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        if (data) {
          setProperty(data);
        } else {
          setError("Failed to fetch property details.");
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("حدث خطأ أثناء جلب بيانات العقار.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // عرض مؤشر التحميل إذا كانت البيانات قيد التحميل
  if (loading) {
    return <h2 className="text-center">جاري التحميل...</h2>;
  }

  // عرض رسالة الخطأ إذا حدث خطأ أثناء جلب البيانات
  if (error) {
    return <h2 className="text-center text-danger">{error}</h2>;
  }

  // إذا لم يتم العثور على العقار
  if (!property) {
    return <h2 className="text-center">العقار غير موجود</h2>;
  }

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
          USD {parseFloat(property.price).toLocaleString()}
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
              { icon: "🏢", label: "الفئة: ", value: property.subcategory },
              { icon: "📍", label: "المدينة: ", value: property.city },
              { icon: "📏", label: "المساحة: ", value: `${property.area} متر مربع` },
              { icon: "🛏️", label: "غرف النوم: ", value: property.rooms },
              { icon: "🚿", label: "الحمام: ", value: property.bathrooms },
              ...(property.type === "إيجار"
                ? [{ icon: "📅", label: "نوع الإيجار: ", value: property.rent_type || "غير متاح" }]
                : []),
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
              <strong>تاريخ الإضافة:</strong>{" "}
              {new Date(property.addedDate).toLocaleDateString()}
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyDetails;