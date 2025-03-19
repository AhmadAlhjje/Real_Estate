import React from "react";
import { FaMapMarkerAlt, FaRulerCombined, FaBed, FaBath, FaHome } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  return (
    <div className="col-md-4" style={{ margin: "20px 0px" }}>
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        {/* صورة العقار */}
        <div className="position-relative">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }} 
          />
          {/* نوع العقار */}
          <span className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark px-3 py-2 rounded-pill">
            {property.type}
          </span>
        </div>

        {/* تفاصيل العقار */}
        <div className="card-body">
          {/* عنوان العقار */}
          <h5 className="fw-bold">{property.title}</h5>

          {/* السعر */}
          <h5 className="text-primary fw-bold">USD {property.price.toLocaleString()}</h5>

          {/* المدينة */}
          <p className="text-muted small">
            <FaMapMarkerAlt /> {property.city}
          </p>

          {/* نوع العقار داخل التصنيف */}
          <p className="text-muted small">
            <FaHome /> {property.subCategory}
          </p>

          {/* نوع الإيجار في حال كان العقار للإيجار */}
          {property.type === "آجار" && (
            <p className="text-muted small">
              <strong>نوع الإيجار:</strong> {property.rentType}
            </p>
          )}

          {/* مواصفات العقار */}
          <div className="d-flex justify-content-between text-muted small">
            <span><FaRulerCombined /> {property.area} M²</span>
            <span><FaBath /> {property.bathrooms}</span>
            <span><FaBed /> {property.livingRooms}</span>
          </div>

          {/* زر عرض التفاصيل */}
          <button className="btn btn-outline-primary w-100 mt-3 rounded-pill">
            عرض التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
