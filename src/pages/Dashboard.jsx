import { useState, useEffect } from "react";
import { IoMdTrendingUp } from "react-icons/io";
import { LiaAwardSolid } from "react-icons/lia";
import { GiScrollQuill } from "react-icons/gi";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { MdOutlineTimer } from "react-icons/md";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [enrollments, setEnrollments] = useState([]);
  
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { themeName } = useTheme();
  const isDark = themeName === "dark";

  useEffect(() => {
    const localId = localStorage.getItem("currentUserId");

    if (!localId || localId === "undefined") {
      navigate("/");
      return;
    }

    const activeId = parseInt(localId);
    setUserId(activeId);

    const fetchData = async () => {
      try {
        const [userRes, enrollmentsRes, coursesRes] = await Promise.all([
          axios.get(`http://localhost:3000/users/${activeId}`),
          axios.get(`http://localhost:3000/enrollments?userId=${activeId}`),
          axios.get(`http://localhost:3000/courses`),
        ]);

        setUserName(userRes.data.name);
        setEnrollments(enrollmentsRes.data);
        setCourses(coursesRes.data);
        setUserData(userRes.data);
        setTimeout(() => setLoaded(true), 350);
      } catch (err) {
        console.log("Error loading data:", err);
        setTimeout(() => setLoaded(true), 350);
      }
    };

    fetchData();
  }, [navigate]);


  const userCourse = enrollments[0]
    ? courses.find((c) => c.id == enrollments[0].courseId)
    : null;

  return (
    <div className="p-8 min-h-screen relative">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl animate-float ${
          isDark ? "bg-blue-600/8" : "bg-blue-300/20"
        }`} />
        <div className={`absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl animate-float ${
          isDark ? "bg-emerald-600/8" : "bg-emerald-300/20"
        }`} style={{animationDelay: '-4s'}} />
        <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-3xl animate-float ${
          isDark ? "bg-purple-600/6" : "bg-purple-300/15"
        }`} style={{animationDelay: '-8s'}} />
      </div>
      <h1 className={`text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent bg-[length:200%_auto] animate-fade-in-gradient opacity-0 ${
        isDark ? "from-blue-400 via-emerald-400 to-blue-400" : "from-blue-600 via-emerald-500 to-blue-600"
      }`}>Welcome, {userName}!</h1>
      <p className={`mb-12 animate-fade-in-up opacity-0 ${
        isDark ? "text-slate-400" : "text-gray-500"
      }`} style={{animationDelay: '0.1s'}}>
        Build your future with LIT Academy.
      </p>

      
      <div className="flex justify-center items-stretch gap-6 mb-10">
        
        <div className={`w-[350px] rounded-xl shadow-sm border p-6 flex flex-col justify-between animate-fade-in-left opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${
          isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
        }`}>
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className={`text-lg font-bold transition-colors duration-300 ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}>
                My Learning Progress
              </h1>
              <IoMdTrendingUp className="text-blue-500 text-2xl animate-pulse-soft" />
            </div>

            <div className="space-y-5">
              {enrollments.map((enrollment) => {
                const courseItem = courses.find((c) => c.id == enrollment.courseId);
                if (!courseItem) return null;

                return (
                  <div key={enrollment.id} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <p className={`font-semibold text-sm transition-colors duration-300 ${
                        isDark ? "text-slate-200" : "text-gray-800"
                      }`}>
                        {courseItem.title}
                      </p>
                      <p className="text-blue-500 text-xs font-bold">
                        {enrollment.progress}%
                      </p>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${
                      isDark ? "bg-slate-700" : "bg-gray-100"
                    }`}>
                      <div
                        style={{ width: loaded ? `${enrollment.progress}%` : '0%' }}
                        className="bg-gradient-to-r from-green-900 to-blue-300 h-full rounded-full transition-all duration-[1200ms] ease-out"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link to="/my-courses" className={`mt-8 w-full flex justify-center items-center py-2.5 border font-medium rounded-lg transition-all duration-200 ${
            isDark ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white" : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
          }`}>
            View All Courses
          </Link>
        </div>

        
        {userCourse ? (
          <div className={`w-[653px] rounded-xl shadow-sm border flex overflow-hidden h-[380px] animate-fade-in-right opacity-0 group hover:shadow-md transition-all duration-500 ${
            isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
          }`} style={{animationDelay: '0.1s'}}>
            <div className="w-[325px] shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
              <img
                className="w-full h-full object-cover rounded-bl-xl rounded-tl-xl group-hover:scale-105 transition-transform duration-700"
                src={userCourse?.image}
                alt="react rasm"
              />
              <span className="absolute top-4 left-4 z-20 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                Featured Course
              </span>
            </div>

            <div className="flex-1 p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-amber-600 text-sm font-bold flex items-center gap-1">
                  ★ {userCourse?.rating}{" "}
                  <span className={`font-normal ${
                    isDark ? "text-slate-400" : "text-gray-400"
                  }`}>
                    ({userCourse?.students || 125} reviews)
                  </span>
                </p>

                <h2 className={`text-2xl font-bold leading-tight tracking-tight transition-colors duration-300 ${
                  isDark ? "text-slate-100" : "text-gray-900"
                }`}>
                  {userCourse?.title}
                </h2>

                <div className="flex items-center gap-2.5 pt-1">
                  <span className={`font-medium text-sm transition-colors duration-300 ${
                    isDark ? "text-slate-400" : "text-gray-500"
                  }`}>
                    {userCourse?.instructor}
                  </span>
                </div>

                <p className={`text-sm leading-relaxed line-clamp-3 pt-2 transition-colors duration-300 ${
                  isDark ? "text-slate-400" : "text-gray-500"
                }`}>
                  {userCourse?.description}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <Link to="/my-courses" className="flex-1 py-2.5 flex justify-center items-center bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                  Start Course
                </Link>

                <button className={`p-2.5 border rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                  isDark ? "border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200" : "border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`w-[653px] rounded-xl shadow-sm border h-[380px] flex items-center justify-center animate-fade-in-right opacity-0 ${
            isDark ? "bg-[#0f1729] border-slate-800 text-slate-500" : "bg-white border-gray-200 text-gray-400"
          }`} style={{animationDelay: '0.1s'}}>
            Loading course...
          </div>
        )}
      </div>

      
      <div className="grid grid-cols-3 gap-6 max-w-[1029px] mx-auto">
        
        <div className={`rounded-xl shadow-sm border p-5 flex items-center gap-4 animate-scale-in opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 group ${
          isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
        }`} style={{animationDelay: '0.2s'}}>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
           <LiaAwardSolid className="text-xl text-emerald-600 dark:text-emerald-400"/>
          </div>
          <div>
            <p className={`text-xs font-medium ${
              isDark ? "text-slate-400" : "text-gray-500"
            }`}>Daily Streak</p>
            <p className={`text-xl font-extrabold transition-colors duration-300 ${
              isDark ? "text-slate-100" : "text-gray-900"
            }`}>
              {userData?.dailyStreak || 0} Days
            </p>
          </div>
        </div>

        
        <div className={`rounded-xl shadow-sm border p-5 flex items-center gap-4 animate-scale-in opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 group ${
          isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
        }`} style={{animationDelay: '0.3s'}}>
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <GiScrollQuill className="text-xl text-amber-600 dark:text-amber-400"/>
          </div>
          <div>
            <p className={`text-xs font-medium ${
              isDark ? "text-slate-400" : "text-gray-500"
            }`}>Quizzes Passed</p>
            <p className={`text-xl font-extrabold transition-colors duration-300 ${
              isDark ? "text-slate-100" : "text-gray-900"
            }`}>
              {userData?.quizzesPassed || 0}
            </p>
          </div>
        </div>

        
        <div className={`rounded-xl shadow-sm border p-5 flex items-center gap-4 animate-scale-in opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 group ${
          isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
        }`} style={{animationDelay: '0.4s'}}>
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <MdOutlineTimer className="text-xl text-blue-600 dark:text-blue-400"/>
          </div>
          <div>
            <p className={`text-xs font-medium ${
              isDark ? "text-slate-400" : "text-gray-500"
            }`}>Hours Learned</p>
            <p className={`text-xl font-extrabold transition-colors duration-300 ${
              isDark ? "text-slate-100" : "text-gray-900"
            }`}>
              {userData?.hoursLearned || 0}h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}