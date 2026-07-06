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
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        <aside className="w-64 overflow-y-auto border-r-2 border-gray-300">
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
