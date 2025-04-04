import { BASE_URL,getToken} from './api'

// دالة لقبول صاحب العقار
export const acceptPropertyOwner = async (id) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("لم يتم العثور على التوكن.");
    }
    const response = await fetch(`${BASE_URL}/admins/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ isApproved: true }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'حدث خطأ أثناء قبول صاحب العقار');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('خطأ أثناء قبول صاحب العقار:', error.message);
    throw error;
  }
};  