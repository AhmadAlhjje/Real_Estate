import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import {sendViewRequest} from '../../api/RequestsApi'
import {getUserIdFromToken} from '../../api/api'
import './ViewRequestModal.css'

const ViewRequestModal = ({ propertyId }) => {
  const [showRequestModal, setShowRequestModal] = useState(false); // حالة لإظهار النموذج
  const [selectedDateTime, setSelectedDateTime] = useState(""); // اختيار التاريخ والوقت
  const [message, setMessage] = useState(""); // الرسالة

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
      property_id: parseInt(propertyId), // معرّف العقار
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
        console.log(requestData)
      alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقًا.");
    }
  };

  return (
    <>
      {/* زر طلب المشاهدة */}
      <button className="btn btn-primary" onClick={() => setShowRequestModal(true)}>
        <FaEye size={20} className="me-2" /> طلب مشاهدة
      </button>

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
    </>
  );
};

export default ViewRequestModal;