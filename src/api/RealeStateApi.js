    import { BASE_URL} from './api'

    //  دالة استلام العقارات كاملة
    export const fetchProperties = async () => {
      try {
        const response = await fetch(`${BASE_URL}/realStates`);
        if (!response.ok) {
          throw new Error("فشل في جلب البيانات");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("خطأ أثناء جلب العقارات:", error);
        return [];
      }
    };


    //  دالة استلام العقارات حسب ال id
    export const getPropertyById = async (id) => {
      try {
        const response = await fetch(`${BASE_URL}/realStates/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching property details:", error);
        return null;
      }
    };


    // دالة لجلب العقارات الخاصة بالمستخدم
    export const fetchUserProperties = async (userId) => {
      try {
        const response = await fetch(`${BASE_URL}/propertyOwners/${userId}/realEstates`);
        if (!response.ok) {
          throw new Error("Failed to fetch user properties.");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching user properties:", error);
        return [];
      }
    };


    // دالة اضافة عقارات
    export const addRealEstate = async (data) => {
      try {
        const response = await fetch(`${BASE_URL}/realStates`, {
          method: "POST",
          body: data, // البيانات المرسلة كـ FormData
        });
    
        if (!response.ok) {
          // إذا كانت الاستجابة ليست ناجحة (مثل حالة 400 أو 500)
          const errorData = await response.json();
          throw new Error(errorData.error || "حدث خطأ أثناء إضافة العقار.");
        }
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("حدث خطأ أثناء إضافة العقار:", error.message);
        throw error;
      }
    };


    // دالة لحذف عقار بناءً على معرفه
    export const deleteProperty = async (propertyId) => {
      try {
        // const token = localStorage.getItem("token"); // استخراج التوكن من التخزين المحلي
    
        const response = await fetch(`${BASE_URL}/realStates/${propertyId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, // إضافة التوكن إلى الرؤوس
          },
        });
    
        if (!response.ok) {
          throw new Error("حدث خطأ أثناء حذف العقار.");
        }
    
        return response.json();
      } catch (error) {
        console.error("خطأ في حذف العقار:", error);
        throw error;
      }
    };


    // دالة لتعديل عقار بناءً على معرفه
    export const updateProperty = async (propertyId, updatedData) => {
      try {
        const token = localStorage.getItem("token"); // استخراج التوكن من التخزين المحلي
    
        if (!token) {
          throw new Error("يجب تسجيل الدخول أولاً."); // التحقق من وجود التوكن
        }
    
        const formData = new FormData();
    
        // إضافة الحقول إلى formData
        for (const key in updatedData) {
          formData.append(key, updatedData[key]);
        }
    
        const response = await fetch(`${BASE_URL}/realStates/${propertyId}`, {
          method: "PUT", // نوع الطلب هو PUT
          // headers: {
          //   Authorization: `Bearer ${token}`, // إضافة التوكن إلى الرؤوس
          // },
          body: formData, // استخدام FormData بدلاً من JSON
        });
    
        if (!response.ok) {
          const errorData = await response.json(); // استخراج رسالة الخطأ من الخادم
          throw new Error(errorData.message || "حدث خطأ أثناء تعديل العقار.");
        }
    
        return response.json(); // إرجاع استجابة الخادم إذا كانت ناجحة
      } catch (error) {
        console.error("خطأ في تعديل العقار:", error);
        throw error; // إعادة رمي الخطأ ليتم التعامل معه في المكون
      }
    };