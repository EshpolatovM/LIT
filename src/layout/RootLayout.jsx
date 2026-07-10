import React, { Suspense } from "react";
import Header from "../components/Header";
import Isade from "../components/Isade";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
function RootLayout() {
const nav = useNavigate()
  useEffect(() => {
    let userId = localStorage.getItem("currentUserId");
    let userName = localStorage.getItem("userName");
    if (!userId || !userName) {
      nav("/");
    }
  },[nav])
  return (
    <Suspense fallback={<Loading />}>
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-emerald-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '-5s'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-300/15 rounded-full blur-3xl animate-float" style={{animationDelay: '-10s'}} />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-amber-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '-3s'}} />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-pink-200/15 rounded-full blur-3xl animate-float" style={{animationDelay: '-7s'}} />
      </div>
      <Header />

      <div className="flex flex-1 relative">
        <aside className="w-64 overflow-y-auto border-r-2 border-gray-300 bg-white/50 backdrop-blur-sm">
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
