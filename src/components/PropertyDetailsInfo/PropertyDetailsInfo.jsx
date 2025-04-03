import React from "react";
import QRCode from "react-qr-code";

const PropertyDetailsInfo = ({ property }) => {

//الرابط الذي سيعرض في QR 
  const qrData = `http://localhost:5173/property/${property.id}`;

  return (
    <div className="details-section mt-4">
      {/* وصف العقار */}
      <div className="description-box">
        <h4 className="section-title">وصف العقار</h4>
        <p>{property.description}</p>
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
            {new Date(property.createdAt).toLocaleDateString()}
          </li>
          {/* إضافة رمز QR */}
          <li className="qr-item">
            <div className="qr-container">
              <p className="mb-2">رمز QR للعقار</p>
              <QRCode value={qrData} size={120} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PropertyDetailsInfo;