import React, { useState, useEffect } from "react";
import { FaUser, FaPhone, FaWhatsapp } from "react-icons/fa";
import { fetchUserRequests } from "../../api/RequestsApi";
import "./ViewRequests.css";

const ViewRequests = () => {
  const [requests, setRequests] = useState([]); // لتخزين بيانات الطلبات
  const [loading, setLoading] = useState(true); // لتحديد حالة التحميل
  const [error, setError] = useState(null); // لتخزين رسالة الخطأ

  // دالة لجلب طلبات المشاهدة عند تحميل المكون
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await fetchUserRequests(); 
        setRequests(data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("حدث خطأ أثناء جلب طلبات المشاهدة.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <p className="no-content">جاري التحميل...</p>;
  }

  if (error) {
    return <p className="no-content text-danger">{error}</p>;
  }

  if (requests.length === 0) {
    return <p className="no-content">لا توجد طلبات مشاهدة بعد.</p>;
  }

  return (
    <div className="view-requests-container">
      <h2 className="section-title">طلبات المشاهدة</h2>
      <div className="requests-list">
        {requests.map((request) => (
          <div key={request.id} className="request-card">
            {/* تفاصيل العقار */}
            <div className="property-details">
              <h5>{request.RealEstate.title}</h5>
              <p>📍 {request.RealEstate.city}</p>
              <p>📅 {new Date(request.visit_date).toLocaleDateString()}</p>
              <p>⏰ {request.visit_time.substring(0, 5)}</p>
            </div>

            {/* تفاصيل المستخدم */}
            <div className="user-details">
              <p>
                <FaPhone /> {request.User.phone}
              </p>
              <p>
                <FaWhatsapp /> {request.User.whatsapp}
              </p>
            </div>

            {/* الرسالة */}
            <div className="message-box">
              <strong>الرسالة:</strong>
              <p>{request.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRequests;