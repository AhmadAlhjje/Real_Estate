import { BASE_URL} from './api'

// دالة انشاء حساب مستخدم
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


// دالة انشاء حساب المسؤول
export const registerAdmin = async (adminData) => {
  try {
    const response = await fetch(`${BASE_URL}/propertyOwners/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) {
      throw new Error("فشل في تسجيل المسؤول");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء تسجيل المسؤول:", error);
    return null;
  }
};

  // دالة تسجيل الدخول للمستخدم
  export const loginUser = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("فشل تسجيل الدخول، تحقق من اسم المستخدم أو كلمة المرور.");
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      throw new Error(error.message); 
    }
  };

  // دالة تسجيل الدخول للمسؤول
export const loginAdmin = async (adminData) => {
  try {
    const response = await fetch(`${BASE_URL}/propertyOwners/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    });

    if (!response.ok) {
      throw new Error("فشل تسجيل الدخول كمسؤول، تحقق من البيانات.");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error(error.message); 
  }
};


