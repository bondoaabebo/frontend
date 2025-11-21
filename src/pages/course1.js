// frontend/src/pages/course1.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api"; // الكلاينت اللي عملناه سابقًا

export default function CourseDetail() {
  const { id } = useParams(); // ناخد الـid من الرابط
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await api.getCourseById(id); // نجيب بيانات الكورس
        setCourse(data);
      } catch (err) {
        setError("حدث خطأ أثناء تحميل الكورس");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <p>جارٍ تحميل الكورس...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="course-detail-page">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <div className="videos-list">
        {course.videos && course.videos.length > 0 ? (
          course.videos.map((video) => (
            <div key={video._id} className="video-card">
              <h4>{video.title}</h4>
              <video src={video.videoUrl} controls />
            </div>
          ))
        ) : (
          <p>لا توجد فيديوهات لهذا الكورس</p>
        )}
      </div>
      <Link to="/" className="btn">
        رجوع للكورسات
      </Link>
    </div>
  );
}
