import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRulerCombined, FaBed, FaBath, FaHome, FaHeart } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // يمكنك هنا تخزين العقار في localStorage أو تحديث المفضلة في قاعدة البيانات
  };

  return (
    <div className="col-md-4" style={{ margin: "20px 0px" }}>
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="position-relative">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }} 
          />
          <span 
            className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark px-3 py-2 rounded-pill"
            style={{ width: "100px"}}
          >
            {property.type}
          </span>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold m-0">{property.title}</h5>
            <FaHeart 
              onClick={toggleFavorite}
              size={22}
              style={{ cursor: "pointer", color: isFavorite ? "red" : "gray" }}
            />
          </div>
          <h5 className="text-primary fw-bold">USD {property.price.toLocaleString()}</h5>
          <p className="text-muted small"><FaMapMarkerAlt /> {property.city}</p>
          <p className="text-muted small"><FaHome /> {property.subCategory}</p>
          {property.type === "آجار" && (
            <p className="text-muted small"><strong>نوع الإيجار:</strong> {property.rentType}</p>
          )}
          <div className="d-flex justify-content-between text-muted small">
            <span><FaRulerCombined /> {property.area} M²</span>
            <span><FaBath /> {property.bathrooms}</span>
            <span><FaBed /> {property.livingRooms}</span>
          </div>
          {/* تعديل الرابط لتمرير الكائن property عبر state */}
          <Link
            to={{
              pathname: `/property/${property.id}`,
              state: { property }, // تمرير الكائن الكامل كجزء من الحالة
            }}
            className="btn btn-outline-primary w-100 mt-3 rounded-pill"
          >
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;