import { BASE_URL} from './api'
import {getUserIdFromToken} from './api'


// دالة لجلب طلبات المشاهدة الخاصة بالمستخدم
export const fetchUserRequests = async () => {
    try {
      const userId = getUserIdFromToken(); // استخراج معرّف المستخدم من التوكن
      console.log(userId)
      if (!userId) {
        throw new Error("يجب تسجيل الدخول أولاً.");
      }
      const response = await fetch(`${BASE_URL}/propertyOwners/${userId}/requests`);
      if (!response.ok) {
        throw new Error("Failed to fetch user requests.");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user requests:", error);
      return [];
    }
  };

     // دالة لإرسال طلب المشاهدة
     export const sendViewRequest = async (requestData) => {
      try {
        const response = await fetch(`${BASE_URL}/requests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to send request.");
        }
        const result = await response.json();
        console.log("Request sent successfully:", result);
        return true;
      } catch (err) {
        console.error("Error sending request:", err);
        return false;
      }
    };