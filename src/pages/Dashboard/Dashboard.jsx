// components/Dashboard.js
import React, { useState } from "react";
import PropertyList from "../../components/PropertyList/PropertyList";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("properties");

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {activeTab === "properties" && <PropertyList />}
        {activeTab === "requests" && <p className="no-content">لا توجد طلبات مراسلة بعد.</p>}
        {activeTab === "add" && <p className="no-content">صفحة إضافة العقار قيد التطوير.</p>}
      </div>

      <div className="dashboard-menu">
        <h2 className="dashboard-title">لوحة تحكم صاحب العقار</h2>
        <button
          className={`tab-btn ${activeTab === "properties" ? "active" : ""}`}
          onClick={() => setActiveTab("properties")}
        >
          عرض العقارات
        </button>
        <button
          className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          عرض طلبات المراسلة
        </button>
        <button
          className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          إضافة عقار
        </button>
      </div>

      
    </div>
  );
};

export default Dashboard;
