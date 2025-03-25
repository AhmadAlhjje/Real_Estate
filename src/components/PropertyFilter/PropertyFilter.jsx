import React, { useState } from "react";
import Filter from "../Filter/Filter";
import "./PropertyFilter.css";

const PropertyFilter = ({ onFilterChange }) => {
  const [propertyType, setPropertyType] = useState("إيجار");
  const [subcategory, setsubcategory] = useState("");
  const [rooms, setrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [city, setCity] = useState("");

  // تابع يتم استدعاؤه عند النقر على زر البحث لإرسال الفلاتر إلى العنصر الأب
  const handleFilterChange = () => {
    onFilterChange({
      propertyType,
      subcategory,
      rooms,
      bathrooms,
      priceRange,
      city,
    });
  };

  // تابع لتحديث نوع العقار وإعادة تعيين باقي الحقول عند تغيير نوع العقار
  const handlePropertyTypeChange = (type) => {
    setPropertyType(type); // تحديث نوع العقار
  };

  return (
    <div className="property-filter">
      <h2>فلترة العقارات</h2>
      
      {/* مكون Filter لاختيار نوع العقار */}
      <Filter onFilter={handlePropertyTypeChange} />
      
      <div className="filters-row">
        {/* فلتر المدينة */}
        <select className="filter-select" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">المدينة</option>
          <option value="حلب"> حلب </option>
          <option value="دمشق">دمشق </option>
          <option value="اللاذقية">اللاذقية </option>
          <option value="حمص">حمص </option>
        </select>

        {/* فلتر التصنيف */}
        <select className="filter-select" value={subcategory} onChange={(e) => setsubcategory(e.target.value)}>
          <option value="">الفئة</option>
          <option value="شقة">شقة</option>
          <option value="فيلا">فيلا</option>
          <option value="مكتب">مكتب</option>
          <option value="مطعم">مطعم</option>
          <option value="متجر">متجر</option>
          <option value="عيادة">عيادة</option>
          <option value="قصر">قصر</option>
        </select>

        {/* فلتر عدد الغرف */}
        <select className="filter-select" value={rooms} onChange={(e) => setrooms(e.target.value)}>
          <option value="">الغرف</option>
          {[1, 2, 3, 4, 5, 6].map((num) => (
          <option key={num} value={num}>{num}</option>
          ))}
        </select>

        {/* فلتر عدد الحمامات */}
        <select className="filter-select" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
          <option value="">الحمامات</option>
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>

        {/* فلتر النطاق السعري */}
        <div className="price-range">
          <input
            type="number"
            className="filter-input"
            placeholder="أدنى سعر"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          />
          <input
            type="number"
            className="filter-input"
            placeholder="أعلى سعر"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          />
        </div>
      </div>

      {/* زر البحث لإرسال الفلاتر إلى العنصر الأب */}
      <button className="search-button" onClick={handleFilterChange}>🔍 بحث</button>
    </div>
  );
};

export default PropertyFilter;