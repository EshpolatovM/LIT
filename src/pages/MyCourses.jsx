import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../assets/ui/Card";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();

  const [active, setActive] = useState("—");
  const [complet, setComplet] = useState("—");
  const [learng, setLearning] = useState("—");
  const [global, setGlobal] = useState("—");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedId = localStorage.getItem("currentUserId");

        if (!storedId) {
          console.warn(
            "LocalStorage ichida foydalanuvchi ID raqami topilmadi!",
          );
          return;
        }

        const loggedInUserId = Number(storedId);

        const res = await axios.get(`http://localhost:3000/users`);
        const allUsers = res.data;

        const myData = allUsers.find(
          (user) => Number(user.id) === loggedInUserId,
        );

        if (myData) {
          setActive(myData.activeCoursesCount ?? 0);
          setComplet(myData.completedCertificates ?? 0);
          setLearning(myData.learningTimeThisMonth ?? 0);
          setGlobal(myData.globalRankTopPercent ?? "—");
        } else {
          console.warn(
            "Baza ichidan ushbu ID ga mos foydalanuvchi topilmadi:",
            loggedInUserId,
          );
        }
      } catch (err) {
        console.error("Ma'lumot yuklashda xatolik yuz berdi:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#0B1C30]">
          Mening kurslarim
        </h1>
        <p className="text-[16px] text-[#718096]">
          Keep track of your academic journey and professional growth.
        </p>
      </div>

      {/* Kartochkalar paneli */}
      <div className="flex gap-6 flex-wrap">
        {/* Active Courses */}
        <div className="bg-white rounded-lg w-[230px] h-[114px] p-5 min-w-[200px] border-2 border-gray-200">
          <p className="text-[12px] text-[#A0AEC0] font-semibold uppercase tracking-wide">
            Active Courses
          </p>
          <div className="flex items-end gap-1 mt-1">
            <p className="text-[32px] font-bold text-[#0056C6] leading-none">
              {active}
            </p>
            <p className="text-[14px] font-bold text-[#006C49]">Ongoing</p>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-lg w-[230px] h-[114px] p-5 min-w-[200px] border-2 border-gray-200">
          <p className="text-[12px] text-[#A0AEC0] font-semibold uppercase tracking-wide">
            Completed
          </p>
          <div className="flex items-end gap-1 mt-1">
            <p className="text-[32px] font-bold text-[#006C49] leading-none">
              {complet}
            </p>
            <p className="font-bold text-[14px] text-[#424754]">Certificates</p>
          </div>
        </div>

        {/* Learning Time */}
        <div className="bg-white rounded-lg w-[230px] h-[114px] p-5 min-w-[200px] border-2 border-gray-200">
          <p className="text-[12px] text-[#A0AEC0] font-semibold uppercase tracking-wide">
            Learning Time
          </p>
          <div className="flex items-end gap-1 mt-1">
            <p className="text-[32px] font-bold text-[#765700] leading-none">
              {learng}
            </p>
            <p className="font-bold text-[14px] text-[#424754]">This Month</p>
          </div>
        </div>

        {/* Global Rank */}
        <div className="bg-white rounded-lg w-[230px] h-[114px] p-5 min-w-[200px] border-2 border-gray-200">
          <p className="text-[12px] text-[#A0AEC0] font-semibold uppercase tracking-wide">
            Global Rank
          </p>
          <div className="flex items-end gap-1 mt-1">
            <p className="text-[32px] font-bold text-[#0B1C30] leading-none">
              #{global}
            </p>
            <p className="font-bold text-[14px] text-[#424754]">top 5%</p>
          </div>
        </div>
      </div>

      <div className="mt-8">{/* <Card img={img} title=""/> */}</div>
    </div>
  );
}

export default MyCourses;
