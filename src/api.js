class ApiClient {
  constructor() {
    // 🔹 رابط الباك إند (من env أو الرابط الثابت)
    this.baseUrl =
      process.env.REACT_APP_API_URL ||
      "https://mybackend-production-a044.up.railway.app";
  }

  // 🟢 دالة عامة لعمل أي ريكويست
  async request(endpoint, options = {}) {
    const { headers: optHeaders, ...restOptions } = options;

    const headers = {
      "Content-Type": "application/json",
      ...(optHeaders || {}),
    };

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        ...restOptions,
        headers,
        credentials: "include", // لو فيه كوكيز أو JWT
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error:", errorText);
        throw new Error(errorText || `Request failed: ${res.status}`);
      }

      const contentType = (res.headers.get("content-type") || "").toLowerCase();

      if (res.status === 204) return null;
      if (!contentType.includes("application/json")) return res.text();

      return res.json();
    } catch (err) {
      console.error("API Exception:", err);
      throw err;
    }
  }

  // 🟢 Courses
  getCourses() {
    return this.request("/api/courses");
  }

  getCourseById(id) {
    return this.request(`/api/courses/${id}`);
  }

  // 🟢 Auth
  registerUser(data) {
    return this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  loginUser(data) {
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // 🟢 Vouchers
  redeemVoucher(code) {
    return this.request("/api/vouchers/redeem", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  }

  // 🟢 Devices
  getDevices() {
    return this.request("/api/devices");
  }
}

const api = new ApiClient();
export default api;
