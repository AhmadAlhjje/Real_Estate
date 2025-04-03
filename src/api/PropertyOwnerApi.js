import { BASE_URL} from './api'

// دالة لجلب جميع أصحاب العقارات
export const fetchPropertyOwners = async () => {
  try {
    const response = await fetch(`${BASE_URL}/propertyOwners`);
    if (!response.ok) {
      throw new Error(`خطأ في جلب البيانات: ${response.statusText}`);
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
    const response = await fetch(`${BASE_URL}/propertyOwners/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`خطأ في حذف صاحب العقار: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`حدث خطأ أثناء حذف صاحب العقار برقم ID: ${id}`, error);
    throw error;
  }
};