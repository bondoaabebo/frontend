import React, { useState } from "react";
import "./ProtectedCourse.css";

function ProtectedCourse({ courseId, user }) {
  const [code, setCode] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [videosToShow, setVideosToShow] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const userCourse = user.courses.find(c => c.courseId === courseId);
    if (!userCourse) return setError("الكود غير صحيح");

    const payment = userCourse.payments.find(p => p.accessCode === code);
    if (!payment) return setError("الكود غير صحيح");

    const now = new Date();
    if (now > new Date(payment.expiresAt)) return setError("انتهت صلاحية الكود");

    setVideosToShow(payment.videos);
    setAccessGranted(true);
  };

  if (!accessGranted) {
    return (
      <div className="protected-course">
        <h2>أدخل كود الاشتراك للكورس</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="ادخل الكود هنا"
          />
          <button type="submit">تحقق</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="course-page">
      <h1>كورس {courseId}</h1>
      <div className="videos-container">
        {videosToShow.map((video, index) => (
          <div key={index} className="video-wrapper">
            <video controls poster={`/images/${video}-thumb.jpg`}>
              <source src={`/videos/${video}.mp4`} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProtectedCourse;
