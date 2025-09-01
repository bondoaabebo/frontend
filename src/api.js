// frontend/src/api.js

class ApiClient {
  constructor() {
    this.baseUrl =
      process.env.NODE_ENV === "production"
        ? "" // في production (نفس الدومين)
        : "http://localhost:5000"; // في local development
  }

  // 🟢 Helper function
  async request(endpoint, options = {}) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || `Request failed: ${res.status}`);
    }

    return res.json();
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
