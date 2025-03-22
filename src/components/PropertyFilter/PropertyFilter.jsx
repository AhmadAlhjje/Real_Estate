import React, { useState } from "react";
import "./PropertyFilter.css";
import Filter from "../Filter/Filter";

const PropertyFilter = ({ onFilterChange}) => {
  const [propertyType, setPropertyType] = useState("إيجار");
  const [subcategory, setsubcategory] = useState("");
  const [rooms, setrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [city, setCity] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      propertyType,
      subcategory,
      rooms,
      bathrooms,
      completionDate,
      priceRange,
      city,
    });
  };

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
    setsubcategory("");
    setrooms("");
    setBathrooms("");
    setCompletionDate("");
    setCity("")
    setPriceRange({ min: "", max: "" });
  };

  return (
    <div className="property-filter">
      <h2>فلترة العقارات</h2>
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

        {propertyType === "مشاريع" ? (
          <>
            {/* الفئات الخاصة بالمشاريع */}
            <select className="filter-select" value={subcategory} onChange={(e) => setsubcategory(e.target.value)}>
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
            {/* الفئات الخاصة بـ شراء و إيجار */}
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

            {/* عدد الغرف */}
            <select className="filter-select" value={rooms} onChange={(e) => setrooms(e.target.value)}>
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

        {/* نطاق السعر */}
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

      {/* زر البحث */}
      <button className="search-button" onClick={handleFilterChange}>🔍 بحث</button>
    </div>
  );
};

export default PropertyFilter;
