import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // إعادة التوجيه لصفحة الدخول
  };

  const dashboardItems = [
    {
      title: "📚 الدروس",
      desc: "عرض جميع الدروس الخاصة بك",
      color: "text-blue-600",
      link: "/courses",
    },
    {
      title: "📝 الواجبات",
      desc: "تسليم ومراجعة الواجبات",
      color: "text-green-600",
      link: "/assignments", // يمكن لاحقًا عمل صفحة الواجبات
    },
    {
      title: "📊 النتائج",
      desc: "عرض درجاتك وتقاريرك",
      color: "text-yellow-600",
      link: "/results", // يمكن لاحقًا عمل صفحة النتائج
    },
    {
      title: "💬 الدعم الفني",
      desc: "تواصل مع فريق المساعدة",
      color: "text-red-600",
      link: "/support", // يمكن لاحقًا عمل صفحة الدعم
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* العنوان العلوي */}
      <header className="bg-blue-600 text-white py-4 px-8 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">منصتك التعليمية</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition"
        >
          تسجيل الخروج
        </button>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6">مرحباً بالطالب 👋</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardItems.map((item, idx) => (
            <Link key={idx} to={item.link}>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center">
                <h3 className={`text-xl font-bold mb-2 ${item.color}`}>
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* الفوتر */}
      <footer className="bg-gray-200 text-center py-4 text-gray-700">
        &copy; {new Date().getFullYear()} جميع الحقوق محفوظة - المنصة التعليمية
      </footer>
    </div>
  );
}
