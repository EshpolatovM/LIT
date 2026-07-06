import React, { use, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdBarChart } from "react-icons/md";
import { GoTrophy } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { IoMdTrophy } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsMortarboardFill } from "react-icons/bs";
import { MdShoppingBag } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";



function Isade() {
  const [userName, setUserName] = useState("User");
  const [role, setRole] = useState("role");
  const [courses, setCourses] = useState([]);
  const [ava, setAva] = useState('avatar');
const nav = useNavigate()


const localD = (e) => {
e.preventDefault()
localStorage.removeItem("currentUserId")
localStorage.removeItem("userName")
nav("/")
}


  useEffect(() => {
    const userId = localStorage.getItem("currentUserId") || 1;
    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.name) setUserName(data.name);
        if (data.role) setRole(data.role);
        if(data.avatar) setAva(data.avatar)
      })

      .catch(() => {
        setUserName("?");
        setRole("?");
      });

    fetch(`http://localhost:3000/courses?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })

      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <div className="flex justify-start gap-[16px] items-center">
        <div className="">
          <img className="w-[40px] h-[40px] rounded-full " src={ava} alt="" />
        </div>
        <div className="">
        <h3 className="text-[20px] font-bold">{userName}</h3>
        <p className="text-[14px] text-blue-500">{role}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive
              ? "p-2 bg-blue-500 flex items-center gap-1.5 text-white rounded-[10px] font-bold"
              : "p-2 text-gray-600 flex items-center hover:bg-gray-200 rounded-[10px]"
          }
        >
          <MdDashboard /> Dashboard
        </NavLink>

        <NavLink
          to="/my-courses"
          className={({ isActive }) =>
            isActive
              ? "p-2 bg-blue-500 flex items-center gap-1.5 text-white rounded-[10px] font-bold"
              : "p-2 text-gray-600 flex items-center gap-1.5 hover:bg-gray-200 rounded-[10px]"
          }
        >
          <BsMortarboardFill /> My Courses
        </NavLink>

        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            isActive
              ? "p-2 bg-blue-500 flex items-center gap-1.5 text-white rounded-[10px] font-bold"
              : "p-2 text-gray-600 flex items-center gap-1.5 hover:bg-gray-200 rounded-[10px]"
          }
        >
          <MdBarChart /> Leaderboard
        </NavLink>

        <NavLink
          to="/achievements"
          className={({ isActive }) =>
            isActive
              ? "p-2 bg-blue-500 flex items-center gap-1.5 text-white rounded-[10px] font-bold"
              : "p-2 text-gray-600 flex items-center gap-1.5 hover:bg-gray-200 rounded-[10px]"
          }
        >
          <IoMdTrophy /> Achievements
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive
              ? "p-2 bg-blue-500 flex items-center gap-1.5 text-white rounded-[10px] font-bold"
              : "p-2 text-gray-600 flex items-center gap-1.5 hover:bg-gray-200 rounded-[10px]"
          }
        >
          <MdShoppingBag /> Shop
        </NavLink>
        <Link
        onClick={localD}
          to="/Login"
          className="p-2 text-gray-600 flex items-center gap-1.5   hover:bg-red-200 hover:text-red-500 rounded-[10px]"
        >
          <IoLogOut /> Log Out
        </Link>
      </nav>
    </div>
  );
}

export default Isade;
