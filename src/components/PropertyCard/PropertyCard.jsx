import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRulerCombined, FaBed, FaBath, FaHome, FaHeart } from "react-icons/fa";
import { BASE_URL } from '../../api/api';

const PropertyCard = ({ property }) => {
  // حالة لإدارة حالة الإعجاب (المفضلة) للعقار
  const [isFavorite, setIsFavorite] = useState(false);

  // تحليل الصور من JSON إلى مصفوفة
  const images = Array.isArray(property.images)
    ? property.images
    : JSON.parse(property.images || '[]');

  // تابع للتبديل بين حالة الإعجاب (إضافة أو إزالة من المفضلة)
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="col-md-4" style={{ margin: "20px 0px" }}>
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="position-relative">
          {/* صورة العقار */}
          <img 
            src={`${BASE_URL}${images[0]}`} // تأكد من وجود صورة واحدة على الأقل
            alt={property.title} 
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }} 
          />
          {/* شارة نوع العقار (بيع/إيجار) */}
          <span 
            className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark px-3 py-2 rounded-pill"
            style={{ width: "100px"}}
          >
            {property.type}
          </span>
        </div>
        <div className="card-body">
          {/* عنوان العقار وأيقونة الإعجاب */}
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold m-0">{property.title}</h5>
            <FaHeart 
              onClick={toggleFavorite}
              size={22}
              style={{ cursor: "pointer", color: isFavorite ? "red" : "gray" }}
            />
          </div>
          {/* سعر العقار */}
          <h5 className="text-primary fw-bold">USD {property.price.toLocaleString()}</h5>
          {/* معلومات الموقع */}
          <p className="text-muted small"><FaMapMarkerAlt /> {property.city}</p>
          {/* تصنيف العقار (شقة، منزل، فيلا، إلخ) */}
          <p className="text-muted small"><FaHome /> {property.subcategory}</p>
          {/* عرض نوع الإيجار إذا كان العقار للإيجار */}
          {property.type === "إيجار" && (
            <p className="text-muted small"><strong>نوع الإيجار:</strong> {property.rent_type}</p>
          )}
          {/* معلومات إضافية مثل المساحة والحمامات والغرف */}
          <div className="d-flex justify-content-between text-muted small">
            <span><FaRulerCombined /> {property.area} M²</span>
            <span><FaBath /> {property.bathrooms}</span>
            <span><FaBed /> {property.rooms}</span>
          </div>
          {/* زر عرض التفاصيل الذي يقود إلى صفحة العقار */}
          <Link
            to={`/property/${property.id}`}
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