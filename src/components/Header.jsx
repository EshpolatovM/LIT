import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { HiCurrencyDollar } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";

function Header() {

  const [coins, setCoins] = useState(0)
  const [userName, setUserName] = useState("User")
  const [ava, setAva] = useState('avatar')
  useEffect(() => {
    const userId = localStorage.getItem("currentUserId") || 1;
    fetch(`http://localhost:3000/users/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      setCoins(data.coins)
      setUserName(data.name)
      setAva(data.avatar)
    })
    .catch((err) => {
      console.log("Error", err)
      setCoins("?")
      setUserName("?")
      setAva("?")
    })
  }, [])
  return (
    <header className="">
      <div className="w-full fix h-[64px] shadow-2xl flex items-center px-6 gap-6">
        <div className="flex items-center gap-3">
          <img
            className="rounded-[50%] h-10 w-10 object-cover"
            src={logo}
            alt="Logo"
          />
          <p className="text-lg font-bold text-gray-800">LIT</p>
        </div>

        <input
          className="w-[314px] h-[44px] rounded-3xl bg-[#E5EEFF] focus:outline-none focus:ring-2 focus:ring-blue-500 px-4"
          type="search"
          placeholder="Qidirish..."
        />

        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm text-gray-600">{userName}</span>
         <img className="w-10 h-10 rounded-full" src={ava} alt="avatar" />
          <p className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-lg">
            <HiCurrencyDollar className="text-yellow-600" />
            <span className="font-bold">{coins}</span>
          </p>
          <p>
            <IoMdNotificationsOutline />
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
