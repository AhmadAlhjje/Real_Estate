import { BASE_URL,getToken} from './api'

// دالة لجلب جميع أصحاب العقارات
export const fetchPropertyOwners = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("لم يتم العثور على التوكن.");
    }
    const response = await fetch(`${BASE_URL}/propertyOwners`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `خطأ في جلب البيانات: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("حدث خطأ أثناء جلب أصحاب العقارات:", error);
    throw error;
  }
};

// دالة لحذف صاحب عقار بناءً على الـ ID
export const deletePropertyOwner = async (id) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("لم يتم العثور على التوكن.");
    }
    const response = await fetch(`${BASE_URL}/propertyOwners/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `خطأ في حذف صاحب العقار: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`حدث خطأ أثناء حذف صاحب العقار برقم ID: ${id}`, error);
    throw error;
  }
};