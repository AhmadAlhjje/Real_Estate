import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRulerCombined, FaBed, FaBath, FaHome, FaHeart } from "react-icons/fa";
import { BASE_URL, getUserIdFromToken } from '../../api/api';
import { addFavorite } from '../../api/FavoritesApi';

const PropertyCard = ({ property }) => {
  // حالة لإدارة حالة الإعجاب (المفضلة) للعقار
  const [isFavorite, setIsFavorite] = useState(false);

  // تحليل الصور من JSON إلى مصفوفة
  const images = Array.isArray(property.images)
    ? property.images
    : JSON.parse(property.images || '[]');

  // دالة لجلب حالة الإعجاب (المفضلة) من الـ API
  const fetchFavorites = async () => {
    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        console.error("حدث خطأ أثناء استخراج معرف المستخدم.");
        return;
      }

      // جلب حالة الإعجاب من الـ API
      const response = await fetch(`${BASE_URL}/favorites/${userId}`);
      if (!response.ok) {
        console.error("خطأ في جلب حالة الإعجاب:", response.statusText);
        return;
      }

      const favorites = await response.json();
      const favorite = favorites.find((fav) => fav.property_id === property.id);

      // تحديث حالة الإعجاب بناءً على قيمة favoritesCount
      setIsFavorite(favorite ? favorite.favoritesCount === 1 : false);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب حالة الإعجاب:", error);
    }
  };

  // دالة لتبديل حالة الإعجاب (إضافة أو إزالة من المفضلة)
  const toggleFavorite = async () => {
    try {
      const userId = getUserIdFromToken();

      if (!userId) {
        alert("حدث خطأ أثناء استخراج معرف المستخدم. يرجى تسجيل الدخول مرة أخرى.");
        return;
      }

      // إعداد البيانات المرسلة
      const requestData = {
        user_id: userId,
        property_id: property.id,
      };

      // إرسال الطلب إلى API
      const response = await addFavorite(requestData);

      // تحديث حالة الإعجاب بناءً على استجابة الـ API
      if (response.message === 'تم إضافة العقار إلى المفضلة') {
        setIsFavorite(true); // تم الإضافة إلى المفضلة
      } else if (response.message === 'تم إزالة العقار من الم_favoriteưa') {
        setIsFavorite(false); // تم الإزالة من المفضلة
      }
    } catch (error) {
      console.error("حدث خطأ أثناء إضافة العقار إلى المفضلة:", error);
      alert("حدث خطأ أثناء إضافة العقار إلى المفضلة. يرجى المحاولة لاحقًا.");
    }
  };

  // جلب حالة الإعجاب عند تحميل المكون
  useEffect(() => {
    fetchFavorites();
  }, []);

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