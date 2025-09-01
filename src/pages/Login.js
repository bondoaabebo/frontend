// frontend/src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://your-backend.onrender.com/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ");
    }
  };

  return (
    <div className="auth-page">
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">تسجيل الدخول</button>
      </form>
      <p>
        ليس لديك حساب؟ <a href="/register">سجل الآن</a>
      </p>
    </div>
  );
}
