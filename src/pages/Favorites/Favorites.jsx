import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { fetchFavorites } from "../../api/FavoritesApi";

const Favorites = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const data = await fetchFavorites(); // استدعاء الـ API للحصول على العقارات المفضلة
        const formattedProperties = data.map((favorite) => favorite.realEstateDetails); // استخراج تفاصيل العقار
        setFilteredProperties(formattedProperties); // تعيين البيانات الأولية للفلترة
      } catch (error) {
        console.error("خطأ في جلب العقارات المفضلة:", error.message);
        setFilteredProperties([]); // تعيين قائمة فارغة في حالة الخطأ
      }
    };

    getFavorites();
  }, []); 

  return (
    <div className="container">
      {/* عرض العقارات المفضلة أو رسالة عدم توفر عقارات */}
      <div className="row">
        {filteredProperties.length > 0 ? (
          // عرض العقارات باستخدام مكون PropertyCard
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          // عرض رسالة إذا لم يتم العثور على عقارات
          <p className="text-center">لا توجد عقارات مفضلة.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;