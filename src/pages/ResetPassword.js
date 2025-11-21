import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }
    try {
      await api.request(`/auth/reset-password/${token}`, {
        method: "POST",
        body: JSON.stringify({ password }),
      });
      setMessage("تم تغيير كلمة المرور بنجاح");
      navigate("/login");
    } catch (err) {
      setMessage("الرابط غير صالح أو منتهي");
    }
  };

  return (
    <div className="auth-page">
      <h2>تغيير كلمة المرور</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="كلمة المرور الجديدة"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="تأكيد كلمة المرور الجديدة"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">تغيير كلمة المرور</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
