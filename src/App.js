// frontend/src/App.js
import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Courses from "./pages/Courses";
import CoursePage from "./pages/CourseDetail";

import "./App.css";

function App() {
  // اختبار الربط بالباك إند (غير الرابط بعد النشر)
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/test")
      .then((res) => console.log("الرد من الباك إند:", res.data))
      .catch((err) => console.error("خطأ في الربط:", err));
  }, []);

  return (
    <div className="App">
      <Navbar />

      {/* قسم البطل / Hero Section */}
      <div className="hero">
        <h1>🎓 سجّل الآن وانطلق مع أفضل الكورسات!</h1>
        <h2>
          لا تفوّت الفرصة طور مهاراتك، اجعل كل يوم فرصة للتقدم، وكن جزء من
          مجتمع الطلاب المتميزين.
        </h2>
        <Link to="/" className="btn-main">
          🎓 اشترك الحين وابدأ رحلتك للنجاح!
        </Link>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CoursePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer */}
      <footer className="footer" id="contact">
        <p>&copy; 2025 Abo Omar. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}

export default App;
