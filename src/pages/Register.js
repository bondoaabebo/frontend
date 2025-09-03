import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }

    try {
      const res = await axios.post(
        "https://your-backend.onrender.com/api/auth/register",
        { name, email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ، حاول مرة أخرى");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>سجل الآن</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">سجل الآن</button>
        </form>
        <p>
          لديك حساب بالفعل؟ <a href="/login">تسجيل الدخول</a>
        </p>
      </div>
    </div>
  );
}
