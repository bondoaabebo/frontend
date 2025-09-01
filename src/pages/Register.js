// frontend/src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://your-backend.onrender.com/api/auth/register",
        { email, password }
      );
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ");
    }
  };

  return (
    <div className="auth-page">
      <h2>تسجيل حساب جديد</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">تسجيل الحساب</button>
      </form>
      <p>
        لديك حساب؟ <a href="/login">سجل الدخول</a>
      </p>
    </div>
  );
}
