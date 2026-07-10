import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdBarChart } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { IoMdTrophy } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsMortarboardFill } from "react-icons/bs";
import { MdShoppingBag } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Isade() {
  const [userName, setUserName] = useState("User");
  const [role, setRole] = useState("role");
  const [ava, setAva] = useState("avatar");
  const nav = useNavigate();
  const { themeName } = useTheme();
  const isDark = themeName === "dark";

  const localD = (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("userName");
    nav("/");
  };

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId") || 1;
    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.name) setUserName(data.name);
        if (data.role) setRole(data.role);
        if (data.avatar) setAva(data.avatar);
      })
      .catch(() => {
        setUserName("?");
        setRole("?");
      });
  }, []);

  const navLinkClass = (isActive) =>
    `px-3 py-2.5 flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-500 text-white shadow-sm shadow-blue-500/20"
        : isDark
          ? "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
    }`;

  return (
    <div className="w-full fixed left-0 top-0 h-full flex flex-col gap-5 p-4 pt-6 animate-fade-in-left opacity-0">
      <div
        className="flex items-center gap-3 px-3 animate-fade-in-left opacity-0"
        style={{ animationDelay: "0.05s" }}
      >
        <img
          className="w-10 h-10 rounded-full ring-2 ring-slate-200 dark:ring-slate-700 object-cover"
          src={ava}
          alt=""
        />
        <div className="min-w-0">
          <h3
            className={`text-[15px] font-semibold leading-tight truncate transition-colors duration-300 ${
              isDark ? "text-slate-100" : "text-slate-800"
            }`}
          >
            {userName}
          </h3>
          <p className="text-[12px] font-medium text-blue-500 dark:text-blue-400 truncate">{role}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 px-1">
        <NavLink to="/dashboard" end className={({ isActive }) => navLinkClass(isActive)}>
          <MdDashboard className="text-lg" /> Dashboard
        </NavLink>

        <NavLink to="/my-courses" className={({ isActive }) => navLinkClass(isActive)}>
          <BsMortarboardFill className="text-lg" /> My Courses
        </NavLink>

        <NavLink to="/leaderboard" className={({ isActive }) => navLinkClass(isActive)}>
          <MdBarChart className="text-lg" /> Leaderboard
        </NavLink>

        <NavLink to="/achievements" className={({ isActive }) => navLinkClass(isActive)}>
          <IoMdTrophy className="text-lg" /> Achievements
        </NavLink>

        <NavLink to="/shop" className={({ isActive }) => navLinkClass(isActive)}>
          <MdShoppingBag className="text-lg" /> Shop
        </NavLink>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50">
          <Link
            onClick={localD}
            to="/Login"
            className={`px-3 py-2.5 flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              isDark
                ? "text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                : "text-slate-500 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <IoLogOut className="text-lg" /> Log Out
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Isade;