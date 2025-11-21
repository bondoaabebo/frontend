class ApiClient {
  constructor() {
    // 🔹 استخدم متغير البيئة للباك إند، مع رابط افتراضي كاحتياط
    this.baseUrl = process.env.REACT_APP_API_URL || "https://mybackend-production-a044.up.railway.app";
  }

  // 🟢 دالة مساعدة لإرسال أي طلب
  async request(endpoint, options = {}) {
    const { headers: optHeaders, ...restOptions } = options;
    const headers = { "Content-Type": "application/json", ...(optHeaders || {}) };

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        ...restOptions,
        headers,
        credentials: "include", // ✅ مهم لو فيه كوكيز أو JWT
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error:", errorText);
        throw new Error(errorText || `Request failed: ${res.status}`);
      }

      const contentType = (res.headers.get("content-type") || "").toLowerCase();
      if (res.status === 204) return null; // لا يوجد محتوى
      if (!contentType.includes("application/json")) return res.text(); // نص عادي

      return res.json();
    } catch (err) {
      console.error("API Exception:", err);
      throw err; // ⚠️ إعادة رمي الخطأ للمعالجة في الكومبوننت
    }
  }

  // 🟢 كورسات
  getCourses() {
    return this.request("/courses");
  }

  getCourseById(id) {
    return this.request(`/courses/${id}`);
  }

  // 🟢 Auth
  registerUser(data) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  loginUser(data) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // 🟢 Vouchers
  redeemVoucher(code) {
    return this.request("/vouchers/redeem", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  }

  // 🟢 Devices
  getDevices() {
    return this.request("/devices");
  }
}

const api = new ApiClient();
export default api;
