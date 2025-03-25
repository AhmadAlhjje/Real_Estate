import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropertyDetailsInfo from "../../components/PropertyDetailsInfo/PropertyDetailsInfo";
import PropertyMedia from "../../components/PropertyMedia/PropertyMedia";
import {getPropertyById} from '../../api/RealeStateApi';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams(); // استخراج الـ id من الرابط
  const [property, setProperty] = useState(null); // لتخزين بيانات العقار
  const [loading, setLoading] = useState(true); // لتحديد حالة التحميل
  const [error, setError] = useState(null); // لتخزين رسالة الخطأ

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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

  if (loading) {
    return <h2 className="text-center">جاري التحميل...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-danger">{error}</h2>;
  }

  if (!property) {
    return <h2 className="text-center">العقار غير موجود</h2>;
  }

  return (
    <div className="container mt-5">
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
      {/* القسم الأول: الوسائط (الفيديو، الخريطة، الصور) */}
      <PropertyMedia property={property} />

      {/* القسم الثاني: تفاصيل العقار */}
      <PropertyDetailsInfo property={property} />
    </div>
  );
};

export default PropertyDetails;