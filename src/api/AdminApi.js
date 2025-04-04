import { BASE_URL} from './api'

// دالة لقبول صاحب العقار
export const acceptPropertyOwner = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/admins/${id}`, {
        method: 'PATCH', 
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