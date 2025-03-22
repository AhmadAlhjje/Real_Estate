import React, { useState } from "react";

const Filter = ({ onFilter }) => {
  const [selected, setSelected] = useState("إيجار");

  const handleFilter = (filterType) => {
    setSelected(filterType);
    onFilter(filterType);
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="d-flex bg-light p-2 rounded-3 shadow-sm" style={{ width: "60%", maxWidth: "600px" }}>
      <button 
          className={`btn ${selected === "إيجار" ? "btn-dark text-white" : "btn-light text-dark"} flex-grow-1 rounded-pill fw-bold`} 
          onClick={() => handleFilter("إيجار")}
        >
          إيجار
        </button>
        <button 
          className={`btn ${selected === "بيع" ? "btn-dark text-white" : "btn-light text-dark"} flex-grow-1 rounded-pill fw-bold`} 
          onClick={() => handleFilter("بيع")}
        >
          بيع
        </button>
        <button 
          className={`btn ${selected === "مشاريع" ? "btn-dark text-white" : "btn-light text-dark"} flex-grow-1 rounded-pill fw-bold`} 
          onClick={() => handleFilter("مشاريع")}
        >
          مشاريع
        </button>
      </div>
    </div>
  );
};

export default Filter;
