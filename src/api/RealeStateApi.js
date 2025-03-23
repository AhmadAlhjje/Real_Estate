    import { BASE_URL} from './api'

    //  دالة استلام العقارات كاملة
    export const fetchProperties = async () => {
      try {
        const response = await fetch(`${BASE_URL}/realStates`);
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


    // دالة لاستخراج معرّف المستخدم من التوكن
    export const getUserIdFromToken = () => {
      const token = localStorage.getItem("token");
      if (!token) return null;

      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // فك تشفير الجزء الأوسط من التوكن
        return payload.id; // استخراج معرّف المستخدم
      } catch (err) {
        console.error("Invalid token:", err);
        return null;
      }
    };

    // دالة لجلب العقارات الخاصة بالمستخدم
    export const fetchUserProperties = async (userId) => {
      try {
        const response = await fetch(`${BASE_URL}/propertyOwners/${userId}/realEstates`);
        if (!response.ok) {
          throw new Error("Failed to fetch user properties.");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching user properties:", error);
        return [];
      }
    };