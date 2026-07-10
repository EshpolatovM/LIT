import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";
import Card from "../assets/ui/Card";
import { useTheme } from "../context/ThemeContext";

function MyCourses() {
  const navigate = useNavigate();
  const { themeName } = useTheme();
  const isDark = themeName === "dark";

  const [active, setActive] = useState("—");
  const [complet, setComplet] = useState("—");
  const [learng, setLearning] = useState("—");
  const [global, setGlobal] = useState("—");
  const [curse, setCurse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const storedId = localStorage.getItem("currentUserId");

        if (!storedId) {
          console.warn("User ID not found in localStorage!");
          return;
        }

        const loggedInUserId = Number(storedId);

        const enrolRes = await axios.get(
          `http://localhost:3000/enrollments?userId=${loggedInUserId}`,
        );

        const dataAll = await Promise.all(
          enrolRes.data.map(async (item) => {
            const courseRes = await axios.get(
              `http://localhost:3000/courses/${item.courseId}`,
            );
            return { ...item, course: courseRes.data };
          }),
        );

        const res = await axios.get(`http://localhost:3000/users`);
        const myData = res.data.find(
          (user) => Number(user.id) === loggedInUserId,
        );

        setCurse(dataAll);

        if (myData) {
          setActive(myData.activeCoursesCount);
          setComplet(myData.completedCertificates);
          setLearning(myData.learningTimeThisMonth);
          setGlobal(myData.globalRankTopPercent);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center">
        <p className={isDark ? "text-slate-400" : "text-gray-500"}>Loading...</p>
      </div>
    );
  }

  const statCardBg = isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200";
  const statLabel = isDark ? "text-slate-400" : "text-gray-500";
  const statText = isDark ? "text-slate-100" : "text-gray-900";

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent bg-[length:200%_auto] animate-fade-in-gradient opacity-0 ${
          isDark ? "from-blue-400 via-emerald-400 to-blue-400" : "from-blue-600 via-emerald-500 to-blue-600"
        }`}>
          My Courses
        </h1>
        <p className={`text-sm animate-fade-in-up opacity-0 ${
          isDark ? "text-slate-400" : "text-gray-500"
        }`} style={{animationDelay: '0.1s'}}>
          Keep track of your academic journey
        </p>
      </div>

      <div className="flex gap-5 flex-wrap">
        <div className={`rounded-xl w-[230px] p-5 border animate-fade-in-up opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${statCardBg}`} style={{animationDelay: '0.15s'}}>
          <p className={`text-xs font-semibold uppercase tracking-wider ${statLabel}`}>
            Active Courses
          </p>
          <div className="flex items-end gap-1.5 mt-2">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 leading-none">
              {active}
            </p>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-0.5">Ongoing</p>
          </div>
        </div>

        <div className={`rounded-xl w-[230px] p-5 border animate-fade-in-up opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${statCardBg}`} style={{animationDelay: '0.2s'}}>
          <p className={`text-xs font-semibold uppercase tracking-wider ${statLabel}`}>
            Completed
          </p>
          <div className="flex items-end gap-1.5 mt-2">
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 leading-none">
              {complet}
            </p>
            <p className={`text-sm font-semibold ${statText} mb-0.5`}>
              Certificates
            </p>
          </div>
        </div>

        <div className={`rounded-xl w-[230px] p-5 border animate-fade-in-up opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${statCardBg}`} style={{animationDelay: '0.25s'}}>
          <p className={`text-xs font-semibold uppercase tracking-wider ${statLabel}`}>
            Learning Time
          </p>
          <div className="flex items-end gap-1.5 mt-2">
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 leading-none">
              {learng}
            </p>
            <p className={`text-sm font-semibold ${statText} mb-0.5`}>
              This Month
            </p>
          </div>
        </div>

        <div className={`rounded-xl w-[230px] p-5 border animate-fade-in-up opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${statCardBg}`} style={{animationDelay: '0.3s'}}>
          <p className={`text-xs font-semibold uppercase tracking-wider ${statLabel}`}>
            Global Rank
          </p>
          <div className="flex items-end gap-1.5 mt-2">
            <p className={`text-3xl font-bold leading-none ${statText}`}>
              #{global}
            </p>
            <p className={`text-sm font-semibold ${statText} mb-0.5`}>
              top {global}%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-5">
        {curse.length > 0 ? (
          curse.map((item, index) => (
            <div key={item.id} className="animate-fade-in-up opacity-0 transition-all duration-500 hover:-translate-y-1" style={{animationDelay: `${0.35 + index * 0.08}s`}}>
              <Card
                img={item.course?.image}
                imgtit={item.course?.title}
                title={item.course?.title}
                ism={item.course?.instructor}
                pro={`${item.progress}%`}
                youtubeUrl={item.course?.youtubeUrl}
              />
            </div>
          ))
        ) : (
          <p className={`text-center py-10 w-full animate-fade-in-up opacity-0 ${
            isDark ? "text-slate-500" : "text-gray-400"
          }`}>
            You haven't enrolled in any courses yet
          </p>
        )}
      </div>

      <div className="flex rounded-xl bg-gradient-to-r from-blue-900 to-blue-200  to-indigo-700 w-[992px] h-[368px] justify-center items-center gap-20 mt-16 animate-fade-in-up opacity-0 hover:shadow-lg transition-all duration-500" style={{animationDelay: '0.5s'}}>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white">
            Ready for the Next Challenge?
          </h1>
          <p className="text-sm text-blue-100">
            Based on your interests in Data Science, we've unlocked a <br />
            specialized workshop for you.
          </p>
          <button className="w-[175px] h-11 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600  to-indigo-700 font-medium bg-white text-white hover:bg-blue-50 hover:scale-[1.02] transition-all duration-300 shadow-sm">
            Explore Catalog
          </button>
        </div>
        <div className="">
          <MdOutlineRocketLaunch className="text-white/20 text-[150px] animate-float" />
        </div>
      </div>
    </div>
  );
}

export default MyCourses;