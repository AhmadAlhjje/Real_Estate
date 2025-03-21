import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRulerCombined, FaBed, FaBath, FaHome } from "react-icons/fa";

const PropertyCard = ({ property }) => {
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
          <h5 className="fw-bold">{property.title}</h5>
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
          <Link to={`/property/${property.id}`} className="btn btn-outline-primary w-100 mt-3 rounded-pill">
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;