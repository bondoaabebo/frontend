import React, { useEffect, useState } from "react";
import api from "../api"; // استدعاء ApiClient

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.getCourses(); // ✅ استخدام ApiClient
        setCourses(data);
      } catch (err) {
        console.error("خطأ في جلب الكورسات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>تحميل الكورسات...</p>;
  if (courses.length === 0) return <p>لا يوجد كورسات متاحة.</p>;

  return (
    <div className="dashboard-page">
      <h2>مرحبًا بك في منصتك التعليمية</h2>

      <div className="courses-list">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button
              onClick={() => (window.location.href = `/course/${course._id}`)}
            >
              اذهب للكورس
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
