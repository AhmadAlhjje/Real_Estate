import React from "react";
import './EditPropertyForm.css';

const EditPropertyForm = ({ editFormData, handleChange, handleSave, cancelEdit }) => {
  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <h3>تعديل العقار</h3>

        {/* عنوان العقار */}
        <label htmlFor="title">اسم العقار:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={editFormData.title || ""}
          onChange={handleChange}
          placeholder="ادخل اسم العقار"
        />

        {/* نوع العقار (بيع، إيجار، مشروع) */}
        <label htmlFor="type">نوع العقار:</label>
        <select
          id="type"
          name="type"
          value={editFormData.type || ""}
          onChange={handleChange}
        >
          <option value="">اختر النوع</option>
          <option value="بيع">بيع</option>
          <option value="إيجار">إيجار</option>
          <option value="مشروع">مشروع</option>
        </select>

        {/* نوع الإيجار (يظهر فقط إذا كان النوع "إيجار") */}
        {editFormData.type === "إيجار" && (
          <>
            <label htmlFor="rent_type">نوع الإيجار:</label>
            <select
              id="rent_type"
              name="rent_type"
              value={editFormData.rent_type || ""}
              onChange={handleChange}
            >
              <option value="">اختر نوع الإيجار</option>
              <option value="سنوي">سنوي</option>
              <option value="شهري">شهري</option>
            </select>
          </>
        )}

        {/* الفئة الفرعية */}
        <label htmlFor="subcategory">الفئة الفرعية:</label>
        <select
          id="subcategory"
          name="subcategory"
          value={editFormData.subcategory || ""}
          onChange={handleChange}
        >
          <option value="">اختر الفئة الفرعية</option>
          <option value="شقة">شقة</option>
          <option value="منزل">منزل</option>
          <option value="قصر">قصر</option>
          <option value="فيلا">فيلا</option>
          <option value="مكتب">مكتب</option>
          <option value="عيادة">عيادة</option>
          <option value="متجر">متجر</option>
          <option value="مطعم">مطعم</option>
        </select>

        {/* المدينة */}
        <label htmlFor="city">المدينة:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={editFormData.city || ""}
          onChange={handleChange}
          placeholder="ادخل اسم المدينة"
        />

        {/* السعر */}
        <label htmlFor="price">السعر:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={editFormData.price || ""}
          onChange={handleChange}
          placeholder="ادخل السعر"
        />

        {/* عدد الغرف */}
        <label htmlFor="rooms">عدد الغرف:</label>
        <input
          type="number"
          id="rooms"
          name="rooms"
          value={editFormData.rooms || ""}
          onChange={handleChange}
          placeholder="ادخل عدد الغرف"
        />

        {/* عدد الحمامات */}
        <label htmlFor="bathrooms">عدد الحمامات:</label>
        <input
          type="number"
          id="bathrooms"
          name="bathrooms"
          value={editFormData.bathrooms || ""}
          onChange={handleChange}
          placeholder="ادخل عدد الحمامات"
        />

        {/* الوصف */}
        <label htmlFor="description">الوصف:</label>
        <textarea
          id="description"
          name="description"
          value={editFormData.description || ""}
          onChange={handleChange}
          placeholder="ادخل وصف العقار"
        />

        {/* خط العرض */}
        <label htmlFor="latitude">خط العرض:</label>
        <input
          type="number"
          id="latitude"
          name="latitude"
          value={editFormData.latitude || ""}
          onChange={handleChange}
          placeholder="ادخل خط العرض"
        />

        {/* خط الطول */}
        <label htmlFor="longitude">خط الطول:</label>
        <input
          type="number"
          id="longitude"
          name="longitude"
          value={editFormData.longitude || ""}
          onChange={handleChange}
          placeholder="ادخل خط الطول"
        />

        {/* المساحة */}
        <label htmlFor="area">المساحة:</label>
        <input
          type="number"
          id="area"
          name="area"
          value={editFormData.area || ""}
          onChange={handleChange}
          placeholder="ادخل المساحة"
        />

        {/* زر الحفظ والإلغاء */}
        <div className="form-actions">
          <button onClick={handleSave} className="save-btn">
            حفظ
          </button>
          <button onClick={cancelEdit} className="cancel-btn">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyForm;