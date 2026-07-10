import React, { Suspense } from "react";
import Header from "../components/Header";
import Isade from "../components/Isade";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
import { useTheme } from "../context/ThemeContext";

function RootLayout() {
const nav = useNavigate()
const { themeName } = useTheme();
const isDark = themeName === "dark";
  useEffect(() => {
    let userId = localStorage.getItem("currentUserId");
    let userName = localStorage.getItem("userName");
    if (!userId || !userName) {
      nav("/");
    }
  },[nav])
  return (
    <Suspense fallback={<Loading />}>
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
      isDark ? "bg-[#0b1120]" : "bg-gradient-to-br from-blue-50 via-white to-emerald-50"
    }`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl animate-float ${
          isDark ? "bg-blue-600/8" : "bg-blue-400/15"
        }`} />
        <div className={`absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-3xl animate-float ${
          isDark ? "bg-emerald-600/8" : "bg-emerald-400/15"
        }`} style={{animationDelay: '-5s'}} />
        <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl animate-float ${
          isDark ? "bg-purple-600/6" : "bg-purple-400/10"
        }`} style={{animationDelay: '-10s'}} />
      </div>
      <Header />

      <div className="flex flex-1 relative">
        <aside className={`w-64 overflow-y-auto border-r transition-colors duration-300 ${
          isDark ? "border-slate-800/60 bg-slate-900/40 backdrop-blur-sm" : "border-gray-200 bg-white/60 backdrop-blur-sm"
        }`}>
          <Isade />
        </aside>

        <main
         className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
    </Suspense>
  );
}

export default RootLayout;