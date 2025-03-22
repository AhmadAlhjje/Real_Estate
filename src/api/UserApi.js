import { BASE_URL} from './api'

// دالة إرسال بيانات التسجيل إلى API
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("فشل في التسجيل");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء التسجيل:", error);
    return null;
  }
};


