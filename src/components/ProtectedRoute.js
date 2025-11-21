// frontend/src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // التوكن العادي
  const adminToken = "admin-token"; // توكن المالك

  if (!token && token !== adminToken) {
    // لو مفيش توكن أو مش توكن المالك
    return <Navigate to="/login" replace />;
  }

  // لو فيه توكن أو توكن المالك، عرض الصفحة
  return children;
}
