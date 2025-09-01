import React, { useState } from "react";

function ProtectedCourse({ courseId, user }) {
  const [code, setCode] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [videosToShow, setVideosToShow] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userCourse = user.courses.find(c => c.courseId === courseId);
    if (!userCourse) return alert("الكود غير صحيح");

    const payment = userCourse.payments.find(p => p.accessCode === code);
    if (!payment) return alert("الكود غير صحيح");

    const now = new Date();
    if (now > new Date(payment.expiresAt)) return alert("انتهت صلاحية الكود");

    setVideosToShow(payment.videos);
    setAccessGranted(true);
  };

  if (!accessGranted) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>أدخل كود الاشتراك للكورس</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="ادخل الكود هنا"
            style={{ padding: "10px", width: "250px", fontSize: "16px" }}
          />
          <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>تحقق</button>
        </form>
      </div>
    );
  }

  return (
    <div className="course-page">
      <h1>كورس {courseId}</h1>
      {videosToShow.map((video, index) => (
        <video key={index} controls width="100%" poster={`/images/${video}-thumb.jpg`}>
          <source src={`/videos/${video}.mp4`} type="video/mp4" />
          متصفحك لا يدعم تشغيل الفيديو
        </video>
      ))}
    </div>
  );
}

export default ProtectedCourse;
