    import { BASE_URL,getToken} from './api'

    //  دالة استلام العقارات كاملة
    export const fetchProperties = async () => {
      try {
        const response = await fetch(`${BASE_URL}/realStates`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "فشل في جلب البيانات");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("خطأ أثناء جلب العقارات:", error.message);
        return [];
      }
    };


    //  دالة استلام العقارات حسب ال id
    export const getPropertyById = async (id) => {
      try {
        const response = await fetch(`${BASE_URL}/realStates/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch property details");
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching property details:", error.message);
        return null;
      }
    };


    // دالة لجلب العقارات الخاصة بالمستخدم
    export const fetchUserProperties = async (userId) => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("لم يتم العثور على التوكن.");
        }
        const response = await fetch(`${BASE_URL}/propertyOwners/${userId}/realEstates`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch user properties.");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching user properties:", error.message);
        return [];
      }
    };

// دالة اضافة عقارات
export const addRealEstate = async (data) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("لم يتم العثور على التوكن.");
    }
    const response = await fetch(`${BASE_URL}/realStates`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
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
        const token = getToken();
        if (!token) {
          throw new Error("لم يتم العثور على التوكن.");
        }
        const response = await fetch(`${BASE_URL}/realStates/${propertyId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "حدث خطأ أثناء حذف العقار.");
        }
        return response.json();
      } catch (error) {
        console.error("خطأ في حذف العقار:", error.message);
        throw error;
      }
    };


    // دالة لتعديل عقار بناءً على معرفه
    export const updateProperty = async (propertyId, updatedData) => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("يجب تسجيل الدخول أولاً.");
        }
        const formData = new FormData();
        for (const key in updatedData) {
          formData.append(key, updatedData[key]);
        }
        const response = await fetch(`${BASE_URL}/realStates/${propertyId}`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
          body: formData, 
        });
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json(); 
          } catch (err) {
            errorData = { message: await response.text() };
            console.log(err) 
          }
          throw new Error(errorData.message || "حدث خطأ أثناء تعديل العقار.");
        }
        return await response.json();
      } catch (error) {
        console.error("خطأ في تعديل العقار:", error);
        throw error;
      }
    };


//  دالة لزيادة عدد المشاهدات للعقار
export const increaseViews = async (propertyId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("لم يتم العثور على التوكن.");
    }
    const response = await fetch(`${BASE_URL}/realStates/views/${propertyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
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