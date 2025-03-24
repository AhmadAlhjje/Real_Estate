import React, { useState } from "react";

const Filter = ({ onFilter }) => {
  const [selected, setSelected] = useState("إيجار");

  // تابع لتحديث نوع الفلتر عند النقر على أحد الأزرار وإرساله إلى العنصر الأب
  const handleFilter = (filterType) => {
    setSelected(filterType); 
    onFilter(filterType); // إرسال نوع الفلتر إلى العنصر الأب من خلال `onFilter`
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      {/* مكون التصفية يحتوي على أزرار لاختيار نوع الفلتر */}
      <div className="d-flex bg-light p-2 rounded-3 shadow-sm" style={{ width: "60%", maxWidth: "600px" }}>
        <button 
          className={`btn ${selected === "إيجار" ? "btn-dark text-white" : "btn-light text-dark"} flex-grow-1 rounded-pill fw-bold`} 
          onClick={() => handleFilter("إيجار")} // عند النقر يتم تحديث الفلتر إلى "إيجار"
        >
          إيجار
        </button>

        <button 
          className={`btn ${selected === "بيع" ? "btn-dark text-white" : "btn-light text-dark"} flex-grow-1 rounded-pill fw-bold`} 
          onClick={() => handleFilter("بيع")} // عند النقر يتم تحديث الفلتر إلى "بيع"
        >
          بيع
        </button>

        <button 
          className={`btn ${selected === "مشاريع" ? "btn-dark text-white" : "btn-light text-dark"} flex-grow-1 rounded-pill fw-bold`} 
          onClick={() => handleFilter("مشاريع")} // عند النقر يتم تحديث الفلتر إلى "مشاريع"
        >
          مشاريع
        </button>
      </div>
    </div>
  );
};

export default Filter;