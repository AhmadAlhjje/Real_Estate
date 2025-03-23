const port=4000
export const BASE_URL = `http://192.168.2.138:${port}`


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