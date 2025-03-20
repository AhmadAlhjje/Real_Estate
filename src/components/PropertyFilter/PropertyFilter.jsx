import React, { useState } from "react";
import "./PropertyFilter.css";
import Filter from "../Filter/Filter";

const PropertyFilter = ({ onFilterChange }) => {
  const [propertyType, setPropertyType] = useState("آجار"); // نوع العقار الافتراضي
  const [category, setCategory] = useState("");
  const [livingRooms, setLivingRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const handleFilterChange = () => {
    onFilterChange({
      propertyType,
      category,
      livingRooms,
      bathrooms,
      completionDate,
      priceRange,
    });
  };

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
    // إعادة تعيين القيم عند تغيير نوع العقار
    setCategory("");
    setLivingRooms("");
    setBathrooms("");
    setCompletionDate("");
    setPriceRange({ min: "", max: "" });
  };

  return (
    <div className="property-filter">
      <h2>فلترة العقارات</h2>
      <Filter onFilter={handlePropertyTypeChange} />
      
      {/*  الفلاتر بناءً على نوع العقار */}
      <div className="filters-row">
        {propertyType === "مشاريع" ? (
          <>
            {/* الفئات الخاصة بالمشاريع */}
            <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">الفئة</option>
              <option value="seaview">إطلالة على البحر</option>
              <option value="city_center">مركز المدينة</option>
              <option value="hotel_apartments">شقق فندقية</option>
            </select>

            {/* تاريخ الانتهاء للمشاريع */}
            <select className="filter-select" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)}>
              <option value="">تاريخ الانتهاء</option>
              <option value="جاهز">جاهز</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </>
        ) : (
          <>
            {/* الفئات الخاصة بـ شراء و آجار */}
            <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">الفئة</option>
              <option value="apartment">شقة</option>
              <option value="villa">فيلا</option>
              <option value="office">مكتب</option>
              <option value="restaurant">مطعم</option>
              <option value="store">متجر</option>
              <option value="clinic">عيادة</option>
              <option value="palace">قصر</option>
            </select>

            {/* عدد الغرف */}
            <select className="filter-select" value={livingRooms} onChange={(e) => setLivingRooms(e.target.value)}>
              <option value="">الغرف</option>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>

            {/* عدد الحمامات */}
            <select className="filter-select" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
              <option value="">الحمامات</option>
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </>
        )}

        {/*  نطاق السعر للجميع */}
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

      {/*  زر البحث */}
      <button className="search-button" onClick={handleFilterChange}>🔍 بحث</button>
    </div>
  );
};

export default PropertyFilter;
