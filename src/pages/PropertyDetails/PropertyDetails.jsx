import React, { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import PropertyDetailsInfo from "../../components/PropertyDetailsInfo/PropertyDetailsInfo"; 
import PropertyMedia from "../../components/PropertyMedia/PropertyMedia";
import { getPropertyById } from '../../api/RealeStateApi'; 
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; 
import "./PropertyDetails.css"; 
import ViewRequestModal from "../../components/ViewRequestModal/ViewRequestModal";

const PropertyDetails = () => {
  const { id } = useParams(); 
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // تأثير الحركة لعناصر الصفحة
  const fadeInUp = {
    initial: { opacity: 0, y: 20 }, // بداية الحركة (شفافية منخفضة وتحريك للأعلى)
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }, // نهاية الحركة (شفافية كاملة وعودة للوضع الطبيعي)
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        if (data) {
          setProperty(data); // تحديث حالة العقار بالبيانات المستلمة
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
      {/* العنوان والسعر */}
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

      {/* القسم الثاني: تفاصيل العقار (الوصف، المعلومات الأساسية، الإحصائيات) */}
      <PropertyDetailsInfo property={property} />

      {/* مكون طلب المشاهدة */}
      <ViewRequestModal propertyId={id} />
    </div>
  );
};

export default PropertyDetails; 