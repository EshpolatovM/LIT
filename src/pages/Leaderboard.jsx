import React, { useState, useEffect } from "react";
import { FaMedal } from "react-icons/fa";
import axios from "axios";
import { MdStars } from "react-icons/md";
import { HiMiniTrophy } from "react-icons/hi2";
import { FaAward } from "react-icons/fa6";
import { useTheme } from "../context/ThemeContext";

function Leaderboard() {
  const [acBtn, setAcBtn] = useState("global");
  const [user, setUser] = useState([]);
  const [userLed, setUserLed] = useState(null);
  const { themeName } = useTheme();
  const isDark = themeName === "dark";

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
      
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-start mb-6 animate-fade-in-up opacity-0">
        <div>
          <h3 className={`text-[28px] font-bold bg-gradient-to-r bg-clip-text text-transparent bg-[length:200%_auto] animate-fade-in-gradient opacity-0 ${
            isDark ? "from-blue-400 via-emerald-400 to-blue-400" : "from-blue-600 via-emerald-500 to-blue-600"
          }`}>
            Leaderboard
          </h3>
          <p className={`text-sm mt-1 animate-fade-in-up opacity-0 ${
            isDark ? "text-slate-400" : "text-gray-500"
          }`} style={{animationDelay: '0.1s'}}>
            Check out the top 10 scholars across all domains this month.
          </p>
        </div>

        <div className={`flex gap-1 p-1 rounded-xl animate-fade-in-up opacity-0 border ${
          isDark ? "bg-slate-800/50 border-slate-700/50" : "bg-blue-50 border-transparent"
        }`} style={{animationDelay: '0.15s'}}>
          {["global", "department", "weekly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setAcBtn(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                acBtn === tab
                  ? isDark
                    ? "bg-slate-700 text-blue-400 shadow-sm"
                    : "bg-white text-blue-600 shadow-sm"
                  : isDark
                    ? "text-slate-400 hover:text-slate-300"
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
          <div className={`w-[200px] rounded-xl border p-4 flex flex-col items-center justify-between relative h-[240px] animate-fade-in-left opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${
            isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
          }`} style={{animationDelay: '0.2s'}}>
            <div className={`absolute -top-3 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
              isDark ? "bg-slate-800 border-slate-600 text-slate-300" : "bg-white border-gray-300 text-gray-700"
            }`}>
              2
            </div>
            <div className="text-2xl mt-2">
              <FaAward className={isDark ? "text-slate-500" : "text-gray-400"} />
            </div>
            <div className={`w-16 h-16 rounded-full border-2 overflow-hidden ${
              isDark ? "border-slate-600" : "border-gray-300"
            }`}>
              <img
                src={top3[1]?.avatar}
                alt={top3[1]?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className={`font-bold text-sm ${
                isDark ? "text-slate-200" : "text-gray-800"
              }`}>
                {top3[1]?.name}
              </p>
              <p className={`text-xs ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}>
                Level {top3[1]?.level}
              </p>
            </div>
            <p className="text-base font-bold text-blue-500">
              {(acBtn === "weekly"
                ? top3[1]?.weeklyXP
                : top3[1]?.xp
              )?.toLocaleString()} XP
            </p>
          </div>

          {/* 1st place */}
          <div className="animate-scale-in opacity-0" style={{animationDelay: '0.1s'}}>
          <div className={`w-[220px] rounded-xl border-2 p-4 flex flex-col items-center justify-between relative h-[280px] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
            isDark ? "bg-amber-900/10 border-amber-500/30" : "bg-amber-50 border-amber-300"
          }`}>
            <div className={`absolute -top-3 w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
              isDark ? "bg-slate-800 border-amber-400 text-amber-300" : "bg-amber-50 border-amber-400 text-amber-700"
            }`}>
              1
            </div>
            <div className="text-3xl mt-2">
              <HiMiniTrophy className="text-yellow-500" />
            </div>
            <div className="w-20 h-20 rounded-full border-2 border-amber-400 overflow-hidden">
              <img
                src={top3[0]?.avatar}
                alt={top3[0]?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className={`font-bold text-sm ${
                isDark ? "text-slate-200" : "text-gray-800"
              }`}>
                {top3[0]?.name}
              </p>
              <p className={`text-xs ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}>
                Level {top3[0]?.level}
              </p>
            </div>
            <p className="text-lg font-bold text-blue-500">
              {(acBtn === "weekly"
                ? top3[0]?.weeklyXP
                : top3[0]?.xp
              )?.toLocaleString()} XP
            </p>
          </div>
          </div>

          {/* 3rd place */}
          <div className={`w-[200px] rounded-xl border p-4 flex flex-col items-center justify-between relative h-[240px] animate-fade-in-right opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${
            isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
          }`} style={{animationDelay: '0.3s'}}>
            <div className={`absolute -top-3 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
              isDark ? "bg-slate-800 border-slate-600 text-slate-300" : "bg-white border-gray-300 text-gray-700"
            }`}>
              3
            </div>
            <div className="text-2xl mt-2">
              <FaAward className="text-amber-500" />
            </div>
            <div className={`w-16 h-16 rounded-full border-2 overflow-hidden ${
              isDark ? "border-slate-600" : "border-gray-300"
            }`}>
              <img
                src={top3[2]?.avatar}
                alt={top3[2]?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className={`font-bold text-sm ${
                isDark ? "text-slate-200" : "text-gray-800"
              }`}>
                {top3[2]?.name}
              </p>
              <p className={`text-xs ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}>
                Level {top3[2]?.level}
              </p>
            </div>
            <p className="text-base font-bold text-blue-500">
              {(acBtn === "weekly"
                ? top3[2]?.weeklyXP
                : top3[2]?.xp
              )?.toLocaleString()} XP
            </p>
          </div>
        </div>
      )}

      {/* ===== TABLE ===== */}
      <div className={`rounded-xl border overflow-hidden animate-fade-in-up opacity-0 ${
        isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
      }`} style={{animationDelay: '0.4s'}}>
        <div className={`flex justify-between items-center p-4 border-b ${
          isDark ? "border-slate-800" : "border-gray-100"
        }`}>
          <h4 className={`text-sm font-bold ${
            isDark ? "text-slate-200" : "text-gray-800"
          }`}>
            Top 10 Scholars
          </h4>
          <span className="bg-blue-600 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            Updated 2m ago
          </span>
        </div>

        <div className={`grid grid-cols-12 gap-4 px-6 py-3 text-[11px] font-semibold uppercase tracking-wider ${
          isDark ? "bg-slate-800/50 text-slate-400" : "bg-gray-50 text-gray-500"
        }`}>
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
              className={`grid grid-cols-12 gap-4 px-6 py-3.5 items-center border-b transition-all duration-200 animate-fade-in-up opacity-0 ${
                isDark
                  ? "border-slate-800 hover:bg-slate-800/30"
                  : "border-gray-100 hover:bg-gray-50"
              }`}
              style={{animationDelay: `${0.45 + index * 0.04}s`}}
            >
              <div className="col-span-1">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDark ? "bg-slate-800 text-slate-400" : "bg-gray-100 text-gray-600"
                }`}>
                  {actualRank}
                </span>
              </div>

              <div className="col-span-4 flex items-center gap-3">
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className={`font-bold text-sm ${
                  isDark ? "text-slate-200" : "text-gray-800"
                }`}>{u.name}</p>
              </div>

              <div className={`col-span-2 text-center font-bold text-sm ${
                isDark ? "text-slate-200" : "text-gray-800"
              }`}>
                {u.level}
              </div>

              <div className="col-span-2 text-center font-bold text-sm text-blue-500">
                {xp.toLocaleString()}
              </div>

              <div className="col-span-3">
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                  isDark ? "bg-slate-700" : "bg-gray-200"
                }`}>
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all"
                    style={{ width: `${per}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="p-4 text-center animate-fade-in-up opacity-0" style={{animationDelay: '0.9s'}}>
          <button className="text-blue-500 font-semibold text-sm hover:text-blue-600 transition-all duration-200">
            Load Full Ranking ↓
          </button>
        </div>
      </div>

      {/* ===== STAT CARDS ===== */}
      {userLed && (
        <div className="mt-8 justify-center gap-5 flex mx-auto flex-wrap">
          
          <div className={`w-[230px] rounded-xl border p-4 flex items-center gap-4 animate-scale-in opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${
            isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
          }`} style={{animationDelay: '0.5s'}}>
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-lg ${
              isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-100 text-blue-600"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className={`text-[10px] font-semibold uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}>
                Velocity
              </p>
              <p className={`text-lg font-bold ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}>
                +{userLed.velocity}%
              </p>
            </div>
          </div>

          
          <div className={`w-[230px] rounded-xl border p-4 flex items-center gap-4 animate-scale-in opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${
            isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
          }`} style={{animationDelay: '0.6s'}}>
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-lg ${
              isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-100 text-emerald-600"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className={`text-[10px] font-semibold uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}>
                Study Time
              </p>
              <p className={`text-lg font-bold ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}>
                {userLed.hoursLearned}h
              </p>
            </div>
          </div>

          
          <div className={`w-[230px] rounded-xl border p-4 flex items-center gap-4 animate-scale-in opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${
            isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
          }`} style={{animationDelay: '0.7s'}}>
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-lg ${
              isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-600"
            }`}>
              <MdStars />
            </div>
            <div>
              <p className={`text-[10px] font-semibold uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}>
                Streak
              </p>
              <p className={`text-lg font-bold ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}>
                {userLed.dailyStreak} Days
              </p>
            </div>
          </div>

          
          <div className={`w-[230px] rounded-xl border p-4 flex items-center gap-4 animate-scale-in opacity-0 hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${
            isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
          }`} style={{animationDelay: '0.8s'}}>
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-lg ${
              isDark ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"
            }`}>
              <FaMedal />
            </div>
            <div>
              <p className={`text-[10px] font-semibold uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}>
                Rank Tier
              </p>
              <p className={`text-lg font-bold ${
                isDark ? "text-slate-100" : "text-gray-900"
              }`}>
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