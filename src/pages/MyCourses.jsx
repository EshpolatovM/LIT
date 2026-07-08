import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";
import Card from "../assets/ui/Card";

function MyCourses() {
  const navigate = useNavigate();

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
          console.warn("LocalStorage ichida foydalanuvchi ID topilmadi!");
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
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#0B1C30] animate-fade-in-up opacity-0">
          Mening kurslarim
        </h1>
        <p className="text-[16px] text-[#718096] animate-fade-in-up opacity-0" style={{animationDelay: '0.1s'}}>
          Keep track of your academic journey
        </p>
      </div>

      <div className="flex gap-6 flex-wrap">
        <div className="bg-white rounded-lg w-[230px] h-[114px] p-5 border-2 border-gray-200 animate-fade-in-up opacity-0 hover:-translate-y-1 hover:shadow-xl transition-all duration-500" style={{animationDelay: '0.15s'}}>
          <p className="text-[12px] text-[#A0AEC0] font-semibold uppercase">
            Active Courses
          </p>
          <div className="flex items-end gap-1 mt-1">
            <p className="text-[32px] font-bold text-[#0056C6] leading-none">
              {active}
            </p>
            <p className="text-[16px] h-4 font-bold text-[#006C49]">Ongoing</p>
          </div>
        </div>

        <div className="bg-white rounded-lg w-[230px] h-[114px] p-5 border-2 border-gray-200 animate-fade-in-up opacity-0 hover:-translate-y-1 hover:shadow-xl transition-all duration-500" style={{animationDelay: '0.2s'}}>
          <p className="text-[12px] text-[#A0AEC0] font-semibold uppercase">
            Completed
          </p>
          <div className="flex items-end gap-1 mt-1">
            <p className="text-[32px] font-bold text-[#006C49] leading-none">
              {complet}
            </p>
            <p className="font-bold text-[16px] h-4 text-[#424754]">
              Certificates
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg w-[230px] h-[114px] p-5 border-2 border-gray-200 animate-fade-in-up opacity-0 hover:-translate-y-1 hover:shadow-xl transition-all duration-500" style={{animationDelay: '0.25s'}}>
          <p className="text-[12px] text-[#A0AEC0] font-semibold uppercase">
            Learning Time
          </p>
          <div className="flex items-end gap-1 mt-1">
            <p className="text-[32px] font-bold text-[#765700] leading-none">
              {learng}
            </p>
            <p className="font-bold text-[16px] h-4 text-[#424754]">
              This Month
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg w-[230px] h-[114px] p-5 border-2 border-gray-200 animate-fade-in-up opacity-0 hover:-translate-y-1 hover:shadow-xl transition-all duration-500" style={{animationDelay: '0.3s'}}>
          <p className="text-[12px] text-[#A0AEC0] font-semibold uppercase">
            Global Rank
          </p>
          <div className="flex items-end gap-1 mt-1">
            <p className="text-[32px] font-bold text-[#0B1C30] leading-none">
              #{global}
            </p>
            <p className="font-bold text-[16px] h-4 text-[#424754]">
              top {global}%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-6">
        {curse.length > 0 ? (
          curse.map((item, index) => (
            <div key={item.id} className="animate-fade-in-up opacity-0 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500" style={{animationDelay: `${0.35 + index * 0.08}s`}}>
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
          <p className="text-gray-400 text-center py-10 w-full animate-fade-in-up opacity-0">
            Hozircha kurslarga yozilmagansiz
          </p>
        )}
      </div>

      <div className="flex rounded-[24px] bg-gradient-to-br from-[#2170E4] to-[#1a5cc7] w-[992px] h-[368px] justify-center items-center gap-25 mt-20 animate-fade-in-up opacity-0 hover:shadow-2xl transition-all duration-500" style={{animationDelay: '0.5s'}}>
        <div className="flex flex-col gap-4">
          <h1 className="text-[32px] font-bold text-white ">
            Tayyormisiz? Next Challenge Awaits!
          </h1>
          <p className="text-[18px] text-[#FEFCFF]">
            Based on your interests in Data Science, we've unlocked a <br />
            specialized workshop for you.
          </p>
          <button className="w-[175px] h-[48px] rounded-[30px] font-medium bg-[#FEFCFF] text-[#0058BE] hover:scale-105 hover:shadow-lg transition-all duration-300">
            Explore Catalog
          </button>
        </div>
        <div className="">
          <MdOutlineRocketLaunch className="text-gray-400 text-[150px] animate-float"/>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
