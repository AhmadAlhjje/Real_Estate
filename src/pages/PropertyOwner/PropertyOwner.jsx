import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchPropertyOwners, deletePropertyOwner } from "../../api/PropertyOwnerApi";
import "./PropertyOwner.css";

function PropertyOwner() {
  // حالة لإدارة قائمة أصحاب العقارات
  const [propertyOwners, setPropertyOwners] = useState([]);

  // تابع لجلب بيانات أصحاب العقارات من الـ API عند تحميل الصفحة
  useEffect(() => {
    const getPropertyOwners = async () => {
      try {
        const owners = await fetchPropertyOwners();
        // تصفية الأشخاص الذين لديهم isApproved === true
        const approvedOwners = owners.filter((owner) => owner.isApproved === true);
        setPropertyOwners(approvedOwners);
      } catch (error) {
        console.error("لم يتم جلب بيانات أصحاب العقارات.", error);
      }
    };
    getPropertyOwners();
  }, []);

  // دالة لحذف صاحب عقار من القائمة وإرسال الطلب إلى الـ API
  const handleDeleteOwner = async (id) => {
    // طلب تأكيد الحذف من المستخدم
    const isConfirmed = window.confirm("هل أنت متأكد أنك تريد حذف هذا العنصر؟");
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
      console.error("حدث خطأ أثناء حذف صاحب العقار.", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">إدارة أصحاب العقارات</h1>
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
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteOwner(owner.id)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropertyOwner;