import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // تأكد من المسار الصحيح لـ ApiClient
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
    setError("");

    if (password !== confirmPassword) {
      setError("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }

    try {
      const deviceId = "device-1"; // يمكن توليد ID ديناميكي إذا أردت
      const res = await api.registerUser({ name, email, password, deviceId });

      const { accessToken } = res;
      if (!accessToken) throw new Error("لم يتم استلام التوكن");

      localStorage.setItem("token", accessToken);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "حدث خطأ أثناء التسجيل");
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
