import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { HiCurrencyDollar } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const [coins, setCoins] = useState(0);
  const [userName, setUserName] = useState("User");
  const [ava, setAva] = useState("avatar");
  const { themeName, toggleTheme } = useTheme();
  const isDark = themeName === "dark";

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId") || 1;
    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCoins(data.coins);
        setUserName(data.name);
        setAva(data.avatar);
      })
      .catch((err) => {
        console.log("Error", err);
        setCoins("?");
        setUserName("?");
        setAva("?");
      });
  }, []);
  return (
    <header className={`sticky z-999 top-0 backdrop-blur-md border-b transition-all duration-300 animate-fade-in-up opacity-0 ${
      isDark ? "bg-slate-900/85 border-slate-800/50" : "bg-white/80 border-gray-200/60 shadow-sm"
    }`}>
      <div className="w-full h-[64px] flex items-center px-6 gap-6">
        <div
          className="flex items-center gap-3 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.05s" }}
        >
          <img
            className="rounded-lg h-9 w-9 object-cover"
            src={logo}
            alt="Logo"
          />
          <p className="text-[11px] sm:text-sm font-extrabold tracking-wide leading-tight whitespace-nowrap bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
            LEARNING INNOVATION TECHNOLOGY
          </p>
        </div>

        <div
          className="ml-auto flex items-center gap-3 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.1s" }}
        >
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 hover:scale-105 ${
              isDark
                ? "bg-slate-800 hover:bg-slate-700 text-amber-400"
                : "bg-gray-100 hover:bg-gray-200 text-gray-500"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <MdLightMode className="text-lg" />
            ) : (
              <MdDarkMode className="text-lg" />
            )}
          </button>

          <p className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
            isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"
          }`}>
            <HiCurrencyDollar className="text-base" />
            <span>{coins}</span>
          </p>
          <button className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
            isDark ? "text-slate-400 hover:bg-slate-800 hover:text-slate-300" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          }`}>
            <IoMdNotificationsOutline className="text-lg" />
          </button>

          <div className={`flex items-center gap-2.5 pl-3 border-l ${
            isDark ? "border-slate-700" : "border-gray-200"
          }`}>
            <span className={`text-sm font-medium transition-colors duration-300 ${
              isDark ? "text-slate-300" : "text-gray-700"
            }`}>{userName}</span>
            <img
              className={`w-8 h-8 rounded-full object-cover ring-2 transition-all duration-300 hover:ring-blue-400 ${
                isDark ? "ring-slate-700" : "ring-gray-200"
              }`}
              src={ava}
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;