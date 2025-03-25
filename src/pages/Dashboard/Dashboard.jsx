import React, { useState } from "react"; 
import PropertyList from "../PropertyList/PropertyList";
import AddProperty from "../AddProperty/AddProperty"; 
import ViewRequests from "../ViewRequests/ViewRequests";
import "./Dashboard.css"; 

const Dashboard = () => {
  // حالة لإدارة التبويب النشط (مثل "عرض العقارات"، "إضافة عقار"، أو "طلبات المراسلة")
  const [activeTab, setActiveTab] = useState("properties");
  // حالة لإدارة فتح وإغلاق القائمة في الشاشات الصغيرة
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dashboard">
      {/* زر فتح القائمة في الشاشات الصغيرة */}
      <button
        className="menu-toggle" // زر لفتح/إغلاق القائمة الجانبية
        onClick={() => setMenuOpen(!menuOpen)} // تغيير حالة القائمة عند النقر
      >
        ☰ 
      </button>

      <div className={`dashboard-menu ${menuOpen ? "open" : ""}`}>
        <h2 className="dashboard-title">لوحة تحكم صاحب العقار</h2>

        <button
          className={`tab-btn ${activeTab === "properties" ? "active" : ""}`} // إضافة فئة active إذا كان التبويب نشطًا
          onClick={() => {
            setActiveTab("properties"); // تعيين التبويب الحالي إلى "properties"
            setMenuOpen(false); // إغلاق القائمة بعد اختيار التبويب
          }}
        >
          عرض العقارات
        </button>

        <button
          className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("requests"); // تعيين التبويب الحالي إلى "requests"
            setMenuOpen(false); // إغلاق القائمة بعد اختيار التبويب
          }}
        >
          عرض طلبات المراسلة
        </button>

        <button
          className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("add"); // تعيين التبويب الحالي إلى "add"
            setMenuOpen(false); // إغلاق القائمة بعد اختيار التبويب
          }}
        >
          إضافة عقار
        </button>
      </div>

      <div className="dashboard-content">
        {/* إذا كان التبويب النشط هو "properties"، يتم عرض مكون PropertyList */}
        {activeTab === "properties" && <PropertyList />}

        {/* إذا كان التبويب النشط هو "requests"، يتم عرض مكون ViewRequests */}
        {activeTab === "requests" && <ViewRequests />}

        {/* إذا كان التبويب النشط هو "add"، يتم عرض مكون AddProperty */}
        {activeTab === "add" && <AddProperty />}
      </div>
    </div>
  );
};

export default Dashboard; 