import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // استدعاء ApiClient

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.loginUser({ email, password }); // ✅ استخدام ApiClient
      localStorage.setItem("token", res.accessToken); // حفظ التوكن
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "حدث خطأ، حاول مرة أخرى");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
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
    </div>
  );
}
