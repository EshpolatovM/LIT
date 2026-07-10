import React, { useState, useEffect } from "react";
import { FaMedal } from "react-icons/fa";
import axios from "axios";
import { MdStars } from "react-icons/md";
import { HiMiniTrophy } from "react-icons/hi2";
import { FaAward } from "react-icons/fa6";

function Leaderboard() {
  const [acBtn, setAcBtn] = useState("global");
  const [user, setUser] = useState([]);
  const [userLed, setUserLed] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const ledId = localStorage.getItem("currentUserId");
        if (!ledId) {
          console.warn("User ID not found in localStorage!");
          return;
        }
        let localId = String(ledId);
        const res = await axios.get("http://localhost:3000/users");

        setUser(res.data);

        const myData = res.data.find((u) => u.id === localId);
        setUserLed(myData);
      } catch (err) {
        console.error("error", err);
      }
    };
    getUsers();
  }, []);

  const getCon = () => {
    let filterd = [...user];
    if (acBtn === "global") {
      filterd.sort((a, b) => b.xp - a.xp);
    } else if (acBtn === "department") {
      filterd.sort((a, b) => b.xp - a.xp);
    } else if (acBtn === "weekly") {
      filterd.sort((a, b) => b.weeklyXP - a.weeklyXP);
    }
    return filterd;
  };

  const displayData = getCon();
  const top3 = displayData.slice(0, 3);
  const rest = displayData.slice(3);

  return (
    <div className="p-6 min-h-screen relative">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-300/15 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-emerald-300/15 rounded-full blur-3xl animate-float" style={{animationDelay: '-4s'}} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-3xl animate-float" style={{animationDelay: '-8s'}} />
      </div>
      
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-start mb-6 animate-fade-in-up opacity-0">
        <div>
          <h3 className="text-[28px] font-bold bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-fade-in-gradient opacity-0">
            Leaderboard
          </h3>
          <p className="text-[14px] text-[#718096] mt-1 animate-fade-in-up opacity-0" style={{animationDelay: '0.1s'}}>
            Check out the top 10 scholars across all domains this month.
          </p>
        </div>

        <div className="flex gap-1 bg-blue-50 p-1 rounded-xl animate-fade-in-up opacity-0" style={{animationDelay: '0.15s'}}>
          {["global", "department", "weekly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setAcBtn(tab)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all capitalize ${
                acBtn === tab
                  ? "bg-white text-[#0056C6] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ===== TOP 3 PODIUM ===== */}
      {top3.length === 3 && (
        <div className="flex justify-center items-end gap-4 mb-8">
          {/* 2nd place */}
          <div className="w-[200px] bg-gray-50 rounded-2xl border-2 border-gray-300 p-4 flex flex-col items-center justify-between relative shadow-sm h-[240px] animate-fade-in-left opacity-0 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500" style={{animationDelay: '0.2s'}}>
            <div className="absolute -top-3 w-8 h-8 rounded-full bg-gray-50 border-gray-300 border-2 flex items-center justify-center font-bold text-[14px] text-[#0B1C30]">
              2
            </div>
            <div className="text-2xl mt-2">
              <FaAward className="text-gray-400" />
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-gray-300 overflow-hidden">
              <img
                src={top3[1]?.avatar}
                alt={top3[1]?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="font-bold text-[14px] text-[#0B1C30]">
                {top3[1]?.name}
              </p>
              <p className="text-[12px] text-gray-500">
                Level {top3[1]?.level}
              </p>
            </div>
            <p className="text-[18px] font-bold text-[#0056C6]">
              {(acBtn === "weekly"
                ? top3[1]?.weeklyXP
                : top3[1]?.xp
              )?.toLocaleString()}{" "}
              XP
            </p>
          </div>

          {/* 1st place */}
          <div className="animate-scale-in opacity-0" style={{animationDelay: '0.1s'}}>
          <div className="w-[220px] bg-yellow-50 rounded-2xl border-2 border-yellow-400 p-4 flex flex-col items-center justify-between relative shadow-md h-[280px] animate-bounce-gentle hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500">
            <div className="absolute -top-3 w-9 h-9 rounded-full bg-yellow-50 border-yellow-400 border-2 flex items-center justify-center font-bold text-[16px] text-[#0B1C30]">
              1
            </div>
            <div className="text-3xl mt-2">
              <HiMiniTrophy className="text-yellow-500" />
            </div>
            <div className="w-20 h-20 rounded-full border-4 border-yellow-400 overflow-hidden">
              <img
                src={top3[0]?.avatar}
                alt={top3[0]?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="font-bold text-[16px] text-[#0B1C30]">
                {top3[0]?.name}
              </p>
              <p className="text-[13px] text-gray-500">
                Level {top3[0]?.level}
              </p>
            </div>
            <p className="text-[20px] font-bold text-[#0056C6]">
              {(acBtn === "weekly"
                ? top3[0]?.weeklyXP
                : top3[0]?.xp
              )?.toLocaleString()}{" "}
              XP
            </p>
          </div>
          </div>

          <div className="w-[200px] bg-orange-50 rounded-2xl border-2 border-orange-400 p-4 flex flex-col items-center justify-between relative shadow-sm h-[240px] animate-fade-in-right opacity-0 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500" style={{animationDelay: '0.3s'}}>
            <div className="absolute -top-3 w-8 h-8 rounded-full bg-orange-50 border-orange-400 border-2 flex items-center justify-center font-bold text-[14px] text-[#0B1C30]">
              3
            </div>
            <div className="text-2xl mt-2">
              <FaAward className="text-amber-700" />
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-orange-400 overflow-hidden">
              <img
                src={top3[2]?.avatar}
                alt={top3[2]?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="font-bold text-[14px] text-[#0B1C30]">
                {top3[2]?.name}
              </p>
              <p className="text-[12px] text-gray-500">
                Level {top3[2]?.level}
              </p>
            </div>
            <p className="text-[18px] font-bold text-[#0056C6]">
              {(acBtn === "weekly"
                ? top3[2]?.weeklyXP
                : top3[2]?.xp
              )?.toLocaleString()}{" "}
              XP
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm animate-fade-in-up opacity-0" style={{animationDelay: '0.4s'}}>
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h4 className="text-[16px] font-bold text-[#0B1C30]">
            Top 10 Scholars
          </h4>
          <span className="bg-[#0056C6] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide animate-pulse-soft">
            Updated 2m ago
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Scholar</div>
          <div className="col-span-2 text-center">Level</div>
          <div className="col-span-2 text-center">
            {acBtn === "weekly" ? "Weekly XP" : "Total XP"}
          </div>
          <div className="col-span-3 text-center">Progress</div>
        </div>

        {rest.map((u, index) => {
          const actualRank = index + 4;
          const xp = acBtn === "weekly" ? u.weeklyXP : u.xp;
          const max = acBtn === "weekly" ? 7000 : 35000;
          const per = Math.min((xp / max) * 100, 100);

          return (
            <div
              key={u.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm animate-fade-in-up opacity-0"
              style={{animationDelay: `${0.45 + index * 0.04}s`}}
            >
              <div className="col-span-1">
                <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-[14px] font-bold">
                  {actualRank}
                </span>
              </div>

              <div className="col-span-4 flex items-center gap-3">
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-bold text-[14px] text-[#0B1C30]">{u.name}</p>
              </div>

              <div className="col-span-2 text-center font-bold text-[14px] text-[#0B1C30]">
                {u.level}
              </div>

              <div className="col-span-2 text-center font-bold text-[14px] text-[#0056C6]">
                {xp.toLocaleString()}
              </div>

              <div className="col-span-3">
                <div className="w-full bg-gray-200 h-[6px] rounded-full overflow-hidden">
                  <div
                    className="bg-[#0056C6] h-full rounded-full transition-all"
                    style={{ width: `${per}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="p-4 text-center animate-fade-in-up opacity-0" style={{animationDelay: '0.9s'}}>
          <button className="text-[#0056C6] font-semibold text-[14px] hover:underline hover:scale-105 transition-all duration-300">
            Load Full Ranking ↓
          </button>
        </div>
      </div>
      {userLed && (
        <div className="mt-8 justify-center gap-23 flex mx-auto">
          
          <div className="bg-white w-[230px] h-[98px] rounded-2xl border border-gray-200 p-5 flex items-center gap-4 animate-scale-in opacity-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-500" style={{animationDelay: '0.5s'}}>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                Velocity
              </p>
              <p className="text-[20px] font-bold text-[#0B1C30]">
                +{userLed.velocity}%
              </p>
            </div>
          </div>

          
          <div className="bg-white w-[230px] h-[98px] rounded-2xl border border-gray-200 p-5 flex items-center gap-4 animate-scale-in opacity-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-500" style={{animationDelay: '0.6s'}}>
            <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-white text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                Study Time
              </p>
              <p className="text-[20px] font-bold text-[#0B1C30]">
                {userLed.hoursLearned}h
              </p>
            </div>
          </div>

          
          <div className="bg-white w-[230px] h-[98px] rounded-2xl border border-gray-200 p-5 flex items-center gap-4 animate-scale-in opacity-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-500" style={{animationDelay: '0.7s'}}>
            <div className="w-12 h-12 bg-amber-300 rounded-full flex items-center justify-center text-white text-xl">
              <p>
                <MdStars />
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                Streak
              </p>
              <p className="text-[20px] font-bold text-[#0B1C30]">
                {userLed.dailyStreak} Days
              </p>
            </div>
          </div>

          
          <div className="bg-white w-[230px] h-[98px] rounded-2xl border border-gray-200 p-5 flex items-center gap-4 animate-scale-in opacity-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-500" style={{animationDelay: '0.8s'}}>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
              <FaMedal />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
                Rank Tier
              </p>
              <p className="text-[20px] font-bold text-[#0B1C30]">
                {userLed.rankTier}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
