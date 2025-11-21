import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.getCourses();
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
    <div className="courses-page">
      <h1>جميع الكورسات</h1>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <img src={course.img || "/images/default.jpg"} alt={course.title} className="course-img" />
            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <Link to={`/course/${course._id}`} className="btn">
                مشاهدة الكورس
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
