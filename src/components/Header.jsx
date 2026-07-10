import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { HiCurrencyDollar } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";

function Header() {
  const [coins, setCoins] = useState(0);
  const [userName, setUserName] = useState("User");
  const [ava, setAva] = useState("avatar");
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
    <header className="sticky z-999 top-0 bg-white/80 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.06)] animate-fade-in-up opacity-0">
      <div className="w-full h-[64px] flex items-center px-6 gap-6">
        <div
          className="flex items-center gap-3 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.05s" }}
        >
          <img
            className="rounded-[50%]  h-10 w-10 object-cover"
            src={logo}
            alt="Logo"
          />
          <p className="text-[11px] sm:text-sm font-extrabold tracking-wide leading-tight whitespace-nowrap animate-fade-in-gradient opacity-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500 bg-clip-text text-transparent bg-[length:200%_auto]">
            LEARNING INNOVATION TECHNOLOGY
          </p>
        </div>

        <div
          className="ml-auto flex items-center gap-4 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-sm text-gray-600">{userName}</span>
          <img
            className="w-10 h-10 rounded-full hover:ring-2 hover:ring-blue-400 transition-all duration-300"
            src={ava}
            alt="avatar"
          />
          <p className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-lg hover:shadow-md transition-all duration-300">
            <HiCurrencyDollar className="text-yellow-600" />
            <span className="font-bold">{coins}</span>
          </p>
          <p className="hover:scale-110 transition-transform duration-300 cursor-pointer">
            <IoMdNotificationsOutline />
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
