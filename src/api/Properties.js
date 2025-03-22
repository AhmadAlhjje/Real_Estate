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
