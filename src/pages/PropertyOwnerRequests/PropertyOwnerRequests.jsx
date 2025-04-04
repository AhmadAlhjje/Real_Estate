import React, { useState, useEffect } from "react";
import { fetchPropertyOwners, deletePropertyOwner } from "../../api/propertyOwners";
import { acceptPropertyOwner } from "../../api/AdminApi"; // استيراد دالة القبول
import "bootstrap/dist/css/bootstrap.min.css";
import "./PropertyOwnerRequests.css";

function PropertyOwnerRequests() {
  // حالة لإدارة قائمة أصحاب العقارات غير المعتمدين
  const [propertyOwners, setPropertyOwners] = useState([]);

  // تابع لجلب بيانات أصحاب العقارات غير المعتمدين من الـ API عند تحميل الصفحة
  useEffect(() => {
    const getPropertyOwners = async () => {
      try {
        const owners = await fetchPropertyOwners();
        // تصفية الأشخاص الذين لديهم isApproved === false
        const unapprovedOwners = owners.filter((owner) => !owner.isApproved);
        setPropertyOwners(unapprovedOwners);
      } catch (error) {
        console.error("لم يتم جلب بيانات أصحاب العقارات.", error);
      }
    };
    getPropertyOwners();
  }, []);

  // دالة لحذف صاحب عقار من القائمة وإرسال الطلب إلى الـ API
  const handleRejectOwner = async (id) => {
    // طلب تأكيد الحذف من المستخدم
    const isConfirmed = window.confirm("هل أنت متأكد أنك تريد رفض هذا الشخص؟");
    if (!isConfirmed) {
      return; // إذا لم يوافق المستخدم، لا تقم بشيء
    }

    try {
      // إرسال طلب الحذف إلى الـ API
      await deletePropertyOwner(id);

      // تحديث القائمة بعد الحذف
      const updatedOwners = propertyOwners.filter((owner) => owner.id !== id);
      setPropertyOwners(updatedOwners);
    } catch (error) {
      console.error("حدث خطأ أثناء رفض صاحب العقار.", error);
    }
  };

  // دالة لقبول صاحب عقار
  const handleAcceptOwner = async (id) => {
    try {
      // إرسال طلب القبول إلى الـ API
      await acceptPropertyOwner(id);

      // تحديث القائمة بعد القبول
      const updatedOwners = propertyOwners.filter((owner) => owner.id !== id);
      setPropertyOwners(updatedOwners);

      alert("تم قبول صاحب العقار بنجاح.");
    } catch (error) {
      console.error("حدث خطأ أثناء قبول صاحب العقار.", error);
      alert("حدث خطأ أثناء قبول صاحب العقار. يرجى المحاولة لاحقًا.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">إدارة طلبات أصحاب العقارات</h1>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>اسم صاحب العقار</th>
            <th>رقم الهاتف</th>
            <th>رقم الواتساب</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {propertyOwners.map((owner) => (
            <tr key={owner.id}>
              <td>{owner.username}</td>
              <td>{owner.phone}</td>
              <td>{owner.whatsapp}</td>
              <td>
                {/* زر القبول */}
                <button
                  className="btn bg-success text-white m-2"
                  onClick={() => handleAcceptOwner(owner.id)}
                >
                  قبول
                </button>
                {/* زر الرفض */}
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleRejectOwner(owner.id)}
                >
                  رفض
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyOwnerRequests;