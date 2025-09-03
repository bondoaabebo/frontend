// frontend/src/App.js
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Courses from "./pages/Courses";
import CoursePage from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  // اختبار الربط بالباك إند
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/test")
      .then((res) => console.log("الرد من الباك إند:", res.data))
      .catch((err) => console.error("خطأ في الربط:", err));
  }, []);

  return (
    <div className="App">
      {/* Navbar ثابت */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* الصفحة الرئيسية: الهيرو + قائمة الكورسات */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Courses />
            </>
          }
        />

        {/* صفحة تفاصيل الكورس */}
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CoursePage />
            </ProtectedRoute>
          }
        />

        {/* صفحات الدخول والتسجيل */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* الداشبورد (محمية) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* مسار بديل لأي رابط غير موجود */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <h2>😕 الصفحة غير موجودة.</h2>
              <a href="/" className="btn">
                رجوع للرئيسية
              </a>
            </div>
          }
        />
      </Routes>

      {/* Footer ثابت */}
      <footer className="footer" id="contact">
        <p>&copy; 2025 Abo Omar. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}

export default App;
