import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `https://your-backend.onrender.com/api/courses/${id}`,
          { headers: { Authorization: token } }
        );
        setCourse(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourse();
  }, [id, token]);

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
