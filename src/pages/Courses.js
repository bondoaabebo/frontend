import { Link } from "react-router-dom";

const courseData = {
  1: { title: "كورس برمجة", desc: "تعلم أساسيات البرمجة خطوة بخطوة.", img: "/images/programming.jpg" },
  2: { title: "كورس تصميم", desc: "إتقان مبادئ التصميم العصري.", img: "/images/design.jpg" },
  3: { title: "كورس تسويق", desc: "استراتيجيات التسويق الرقمي الحديثة.", img: "/images/marketing.jpg" },
  4: { title: "كورس إدارة", desc: "مهارات الإدارة وقيادة الفرق.", img: "/images/management.jpg" },
  5: { title: "كورس لغة إنجليزية", desc: "تطوير مهارات اللغة الإنجليزية.", img: "/images/english.jpg" },
  6: { title: "كورس ذكاء اصطناعي", desc: "مدخل إلى عالم الذكاء الاصطناعي.", img: "/images/ai.jpg" },
  7: { title: "كورس أمن سيبراني", desc: "أساسيات الحماية والأمن السيبراني.", img: "/images/cybersecurity.jpg" },
  8: { title: "كورس تطوير مواقع", desc: "تعلم بناء مواقع ويب احترافية.", img: "/images/webdev.jpg" },
};

export default function CoursesPage() {
  return (
    <div className="courses-page">
      <h1>جميع الكورسات</h1>
      <div className="courses-grid">
        {Object.entries(courseData).map(([id, course]) => (
          <div key={id} className="course-card">
            <img src={course.img} alt={course.title} className="course-img" />
            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.desc}</p>
              <Link to={`/course/${id}`} className="btn">
                مشاهدة الكورس
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
