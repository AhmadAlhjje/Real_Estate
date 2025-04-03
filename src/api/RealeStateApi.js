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
          body: data, 
        });
    
        if (!response.ok) {
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
        const response = await fetch(`${BASE_URL}/realStates/${propertyId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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
        const token = localStorage.getItem("token"); 
    
        if (!token) {
          throw new Error("يجب تسجيل الدخول أولاً.");
        }
        const formData = new FormData();
    
        // إضافة الحقول إلى formData
        for (const key in updatedData) {
          formData.append(key, updatedData[key]);
        }
    
        const response = await fetch(`${BASE_URL}/realStates/${propertyId}`, {
          method: "PUT",
          // headers: {
          //   Authorization: `Bearer ${token}`, 
          // },
          body: formData, 
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "حدث خطأ أثناء تعديل العقار.");
        }
    
        return response.json(); 
      } catch (error) {
        console.error("خطأ في تعديل العقار:", error);
        throw error;
      }
    };

// دالة لزيادة عدد المشاهدات للعقار
export const increaseViews = async (propertyId) => {
  try {
    const response = await fetch(`${BASE_URL}/realStates/views/${propertyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'حدث خطأ أثناء تحديث عدد المشاهدات');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('حدث خطأ أثناء تحديث عدد المشاهدات:', error.message);
    throw error;
  }
};