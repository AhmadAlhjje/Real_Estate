import React, { useState } from "react";
import PropertyList from "../../components/PropertyList/PropertyList";
import "./Dashboard.css";
import AddProperty from "../AddProperty/AddProperty";
import ViewRequests from "../ViewRequests/ViewRequests";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("properties");
  const [menuOpen, setMenuOpen] = useState(false); // للتحكم في إظهار القائمة في الشاشات الصغيرة

  return (
    <div className="dashboard">
      {/* زر فتح القائمة في الشاشات الصغيرة */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* لوحة التحكم */}
      <div className={`dashboard-menu ${menuOpen ? "open" : ""}`}>
        <h2 className="dashboard-title">لوحة تحكم صاحب العقار</h2>
        <button
          className={`tab-btn ${activeTab === "properties" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("properties");
            setMenuOpen(false); // إغلاق القائمة بعد اختيار عنصر
          }}
        >
          عرض العقارات
        </button>
        <button
          className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("requests");
            setMenuOpen(false);
          }}
        >
          عرض طلبات المراسلة
        </button>
        <button
          className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("add");
            setMenuOpen(false);
          }}
        >
          إضافة عقار
        </button>
      </div>

            {/* محتوى لوحة التحكم */}
      <div className="dashboard-content">
        {activeTab === "properties" && <PropertyList />}
        {activeTab === "requests"&&<ViewRequests/>}
        {activeTab === "add" && <AddProperty/>}
      </div>
    </div>
  );
};

export default Dashboard;
