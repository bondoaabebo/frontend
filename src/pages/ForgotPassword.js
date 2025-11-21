import React, { useState } from "react";
import api from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.request("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setMessage("تم إرسال رابط استرجاع كلمة المرور إلى بريدك الإلكتروني");
    } catch (err) {
      setMessage("حدث خطأ، حاول مرة أخرى");
    }
  };

  return (
    <div className="auth-page">
      <h2>نسيت كلمة المرور</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">إرسال الرابط</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

