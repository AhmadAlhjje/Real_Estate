// PropertyDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapComponent from "../../components/MapComponent/MapComponent";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaExpand, FaEye } from "react-icons/fa"; // إضافة أيقونة طلب المشاهدة
import "./PropertyDetails.css";
import { getPropertyById, sendViewRequest } from '../../api/RealeStateApi'; // استدعاء الدوال من ملف الـ API
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { BASE_URL} from '../../api/api'

const PropertyDetails = () => {
  const { id } = useParams(); // استخراج الـ id من الرابط
  const [property, setProperty] = useState(null); // لتخزين بيانات العقار
  const [loading, setLoading] = useState(true); // لتحديد حالة التحميل
  const [error, setError] = useState(null); // لتخزين رسالة الخطأ

  // حالة لإظهار نموذج طلب المشاهدة
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [message, setMessage] = useState(""); // حالة جديدة للرسالة

  // دالة لعرض نموذج الطلب
  const handleViewRequest = () => {
    setShowRequestModal(true);
  };

  // دالة لاستخراج معرّف المستخدم من التوكن
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // فك تشفير الجزء الأوسط من التوكن
      return payload.id; // استخراج معرّف المستخدم
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  };

  // دالة لإرسال الطلب إلى الـ API
  const handleSubmitRequest = async () => {
    if (!selectedDateTime || !message.trim()) {
      alert("يرجى اختيار التاريخ والوقت وإدخال رسالة.");
      return;
    }

    // استخراج معرّف المستخدم
    const userId = getUserIdFromToken();
    if (!userId) {
      alert("يجب تسجيل الدخول أولاً.");
      return;
    }

    // تقسيم التاريخ والوقت
    const [visit_date, visit_time] = selectedDateTime.split("T");

    // تحضير البيانات المرسلة
    const requestData = {
      property_id: parseInt(id), // معرّف العقار
      user_id: userId, // معرّف المستخدم
      message: message, // الرسالة
      visit_date: visit_date, // تاريخ الزيارة
      visit_time: visit_time, // وقت الزيارة
    };

    // إرسال البيانات إلى الـ API باستخدام الدالة المسؤولة
    const success = await sendViewRequest(requestData);
    if (success) {
      alert(`تم إرسال طلب المشاهدة بنجاح!`);
      setShowRequestModal(false); // إغلاق النموذج بعد الإرسال
    } else {
      alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقًا.");
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id); // استخدام الدالة المستوردة
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

  if (loading) {
    return <h2 className="text-center">جاري التحميل...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-danger">{error}</h2>;
  }

  if (!property) {
    return <h2 className="text-center">العقار غير موجود</h2>;
  }

  const images = property.images.map(imagePath => ({
    original: `${BASE_URL}${imagePath}`, // المسار الكامل للصورة الأصلية
    thumbnail: `${BASE_URL}${imagePath}`, // يمكن استخدام نفس المسار كصورة مصغرة
  }));

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const qrData = `http://localhost:5173/property/${id}`;

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
              src={`${BASE_URL}${property.images[0]}`}
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
          <ul className="list-unstyled d-flex flex-wrap gap-3">
            <li>
              <strong>عدد المشاهدات:</strong> {property.views}
            </li>
            <li>
              <strong>تاريخ الإضافة:</strong>{" "}
              {new Date(property.addedDate).toLocaleDateString()}
            </li>
            {/* إضافة رمز QR هنا */}
            <li className="qr-item">
              <div className="qr-container">
                <p className="mb-2">رمز QR للعقار</p>
                <QRCode value={qrData} size={120} />
              </div>
            </li>
          </ul>
        </div>

        {/* زر طلب المشاهدة */}
        <motion.div
          className="request-view-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="btn btn-primary" onClick={handleViewRequest}>
            <FaEye size={20} className="me-2" /> طلب مشاهدة
          </button>
        </motion.div>

        {/* نموذج طلب المشاهدة */}
        {showRequestModal && (
          <div className="view-request-modal">
            <div className="modal-content">
              <h5 className="modal-title">طلب مشاهدة العقار</h5>
              <div className="mb-3">
                <label htmlFor="datetime" className="form-label">
                  اختر التاريخ والوقت:
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="datetime"
                  value={selectedDateTime}
                  onChange={(e) => setSelectedDateTime(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  الرسالة:
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="3"
                  placeholder="أدخل رسالة..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowRequestModal(false)}
                >
                  إلغاء
                </button>
                <button className="btn btn-success" onClick={handleSubmitRequest}>
                  إرسال الطلب
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PropertyDetails;