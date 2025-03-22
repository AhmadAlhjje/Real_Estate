import { BASE_URL} from './api'
 const API_URL = `${BASE_URL}/realStates`;


//  دالة استلام العقارات كاملة
export const fetchProperties = async () => {
  try {
    const response = await fetch(API_URL);
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
