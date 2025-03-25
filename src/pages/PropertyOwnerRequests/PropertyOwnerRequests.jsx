// App.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PropertyOwnerRequests.css";

function PropertyOwnerRequests() {
  // مصفوفة تجريبية تحتوي على بيانات أصحاب العقارات
  const [propertyOwners, setPropertyOwners] = useState([
    { id: 1, name: "أحمد علي", phone: "0599123456", whatsapp: "0599123456" },
    { id: 2, name: "محمد خالد", phone: "0598765432", whatsapp: "0598765432" },
    { id: 3, name: "سعيد عمر", phone: "0561234567", whatsapp: "0561234567" },
  ]);

  // دالة لحذف صاحب عقار من القائمة
  const deleteOwner = (id) => {
    const updatedOwners = propertyOwners.filter((owner) => owner.id !== id);
    setPropertyOwners(updatedOwners);
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
              <td>{owner.name}</td>
              <td>{owner.phone}</td>
              <td>{owner.whatsapp}</td>
              <td>
                <button
                  className="btn btn-danger m-4"
                  onClick={() => deleteOwner(owner.id)}
                >
                  قبول
                </button>
                <button
                  className="btn bg-success text-white"
                  onClick={() => deleteOwner(owner.id)}
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