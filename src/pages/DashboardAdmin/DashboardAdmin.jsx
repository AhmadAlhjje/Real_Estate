import React, { useState } from "react"; 
import PropertyOwner from "../propertyOwner/propertyOwner";
import PropertyOwnerRequests from "../PropertyOwnerRequests/PropertyOwnerRequests";
import "./DashboardAdmin.css"; 

const DashboardAdmin = () => {
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
        <h2 className="dashboard-title">لوحة تحكم الأدمن</h2>

        <button
          className={`tab-btn ${activeTab === "properties" ? "active" : ""}`} // إضافة فئة active إذا كان التبويب نشطًا
          onClick={() => {
            setActiveTab("properties"); // تعيين التبويب الحالي إلى "properties"
            setMenuOpen(false); // إغلاق القائمة بعد اختيار التبويب
          }}
        >
          عرض أصحاب العقارات
        </button>

        <button
          className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("requests"); // تعيين التبويب الحالي إلى "requests"
            setMenuOpen(false); // إغلاق القائمة بعد اختيار التبويب
          }}
        >
          عرض طلبات القبول
        </button>
      </div>

      <div className="dashboard-content">
        {/* إذا كان التبويب النشط هو "properties"، يتم عرض مكون PropertyList */}
        {activeTab === "properties" && <PropertyOwner />}

        {/* إذا كان التبويب النشط هو "requests"، يتم عرض مكون ViewRequests */}
        {activeTab === "requests" && <PropertyOwnerRequests />}

      </div>
    </div>
  );
};

export default DashboardAdmin; 