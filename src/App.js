import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // لو عندك فوتر منفصل
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CoursePage from "./pages/CourseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import api from "./api";

import "./App.css";

function App() {
  useEffect(() => {
    api.request("/api/test")
      .then((res) => console.log("✅ الرد من الباك إند:", res))
      .catch((err) => console.error("❌ خطأ في الربط:", err));
  }, []);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* الصفحة الرئيسية: الهيرو + قائمة الكورسات */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Home />
                <Courses />
              </>
            </ProtectedRoute>
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

        {/* الداشبورد */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* صفحات الدخول والتسجيل */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* مسار بديل لأي رابط غير موجود */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <h2>😕 الصفحة غير موجودة.</h2>
              <a href="/" className="btn">رجوع للرئيسية</a>
            </div>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
  