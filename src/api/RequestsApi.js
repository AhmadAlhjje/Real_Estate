import { BASE_URL,getUserIdFromToken,getToken} from './api'


// دالة لجلب طلبات المشاهدة الخاصة بالمستخدم
export const fetchUserRequests = async () => {
  try {
    const token = getToken(); 
    if (!token) {
      throw new Error("لم يتم العثور على التوكن.");
    }
    const userId = getUserIdFromToken();
    if (!userId) {
      throw new Error("يجب تسجيل الدخول أولاً.");
    }
    const response = await fetch(`${BASE_URL}/propertyOwners/${userId}/requests`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch user requests.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user requests:", error.message);
    return [];
  }
};

     // دالة لإرسال طلب المشاهدة
     export const sendViewRequest = async (requestData) => {
      try {
        const token=getToken();
        const response = await fetch(`${BASE_URL}/requests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
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