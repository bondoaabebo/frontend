import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api"; // استدعاء ApiClient

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // ✅ استخدام ApiClient بدل axios
        const data = await api.getCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error("خطأ في جلب بيانات الكورس:", err);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <p>تحميل الكورس...</p>;

  return (
    <div className="course-detail-page">
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      <div className="videos-list">
        {course.videos.map((video) => (
          <div key={video._id} className="video-card">
            <h4>{video.title}</h4>
            <video src={video.videoUrl} controls />
          </div>
        ))}
      </div>

      <Link to="/" className="btn">رجوع للكورسات</Link>
    </div>
  );
}
