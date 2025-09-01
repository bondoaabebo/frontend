// frontend/src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "https://your-backend.onrender.com/api/courses",
          {
            headers: { Authorization: token },
          }
        );
        setCourses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, [token]);

  return (
    <div className="dashboard-page">
      <h2>مرحبًا بك في منصتك التعليمية</h2>
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button
              onClick={() => (window.location.href = `/courses/${course._id}`)}
            >
              اذهب للكورس
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
