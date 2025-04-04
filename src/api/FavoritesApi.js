import { BASE_URL,getUserIdFromToken,getToken } from './api';

// دالة لإضافة العقار إلى المفضلة
export const addFavorite = async (data) => {
  try {
    const token=getToken();
    const response = await fetch(`${BASE_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data), 
    });
    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(errorData.error || 'حدث خطأ أثناء إضافة العقار إلى المفضلة');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("حدث خطأ أثناء إضافة العقار إلى المفضلة:", error.message);
    throw error; 
  }
};

// دالة لجلب العقارات المفضلة للمستخدم
export const fetchFavorites = async () => {
  try {
    // استخراج معرف المستخدم من التوكن
    const userId = getUserIdFromToken();
    if (!userId) {
      throw new Error("لم يتم العثور على معرف المستخدم.");
    }
    const token = getToken();
    if (!token) {
      throw new Error("لم يتم العثور على التوكن.");
    }
    const response = await fetch(`${BASE_URL}/favorites/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "حدث خطأ أثناء جلب المفضلة.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    console.error("خطأ في جلب العقارات المفضلة:", error.message);
    return [];
  }
};