// frontend/src/components/Hero.js
import { Link } from "react-router-dom";
import "./Hero.css"; // ملف CSS لازم يكون في نفس الفولدر

function Hero() {
  return (
    <div className="hero">
      <h1>🎓 سجّل الآن وانطلق مع أفضل الكورسات!</h1>
      <h2>
        لا تفوّت الفرصة طور مهاراتك، اجعل كل يوم فرصة للتقدم، وكن جزء من
        مجتمع الطلاب المتميزين.
      </h2>
      <Link to="/register" className="btn-main">
        🎓 اشترك الحين وابدأ رحلتك للنجاح!
      </Link>
    </div>
  );
}

export default Hero;
