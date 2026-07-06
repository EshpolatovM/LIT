import { useState, useEffect } from "react";
import { IoMdTrendingUp } from "react-icons/io";
import { LiaAwardSolid } from "react-icons/lia";
import { GiScrollQuill } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { MdOutlineTimer } from "react-icons/md";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [enrollments, setEnrollments] = useState([]);
  
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const localId = localStorage.getItem("currentUserId");

    if (!localId || localId === "undefined") {
      navigate("/");
      return;
    }

    const activeId = parseInt(localId);
    setUserId(activeId);

    const fetchData = async () => {
      try {
        const [userRes, enrollmentsRes, coursesRes] = await Promise.all([
          axios.get(`http://localhost:3000/users/${activeId}`),
          axios.get(`http://localhost:3000/enrollments?userId=${activeId}`),
          axios.get(`http://localhost:3000/courses`),
        ]);

        setUserName(userRes.data.name);
        setEnrollments(enrollmentsRes.data);
        setCourses(coursesRes.data);
        setUserData(userRes.data);
      } catch (err) {
        console.log("Ma'lumot yuklashda xatolik:", err);
      }
    };

    fetchData();
  }, [navigate]);


  const course = courses[0];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Xush Kelibsiz, {userName}!</h1>
      <p className="text-gray-600 mb-12">
        O'quv rejangiz bo'yicha davom eting.
      </p>

      
      <div className="flex justify-center items-stretch gap-6 mb-10">
        
        <div className="w-[350px] bg-white rounded-[16px] shadow-xl p-6 flex flex-col justify-between border border-gray-100">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-[20px] font-bold text-[#0B1C30]">
                My Learning Progress
              </h1>
              <IoMdTrendingUp className="text-[#006C49] text-2xl" />
            </div>

            <div className="space-y-5">
              {enrollments.map((enrollment) => {
                const courseItem = courses.find((c) => c.id == enrollment.courseId);
                if (!courseItem) return null;

                return (
                  <div key={enrollment.id} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-[14px] text-[#0B1C30]">
                        {courseItem.title}
                      </p>
                      <p className="text-[#006C49] text-[13px] font-bold">
                        {enrollment.progress}%
                      </p>
                    </div>
                    <div className="w-full bg-[#EAEEF4] h-[8px] rounded-full overflow-hidden">
                      <div
                        style={{ width: `${enrollment.progress}%` }}
                        className="bg-gradient-to-r from-emerald-400 to-emerald-900 h-full rounded-full transition-all duration-500"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="mt-8 w-full py-3 border-2 border-[#0056C6] text-[#0056C6] font-semibold rounded-[12px] hover:bg-[#0056C6] hover:text-white transition-colors duration-200">
            Barcha kurslarni ko'rish
          </button>
        </div>

        
        {course ? (
          <div className="w-[653px] bg-white rounded-[16px] shadow-xl flex border border-gray-100 overflow-hidden h-[380px]">
            <div className="w-[325px] shrink-0 relative">
              <img
                className="w-full h-full object-cover rounded-bl-[16px] rounded-tl-[16px]"
                src="https://th.bing.com/th/id/OIP.I_K3Qgjq0gxINQDoqEq5UAHaFj?w=244&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                alt="react rasm"
              />
              <span className="absolute top-4 left-4 bg-[#0056C6] text-white text-[12px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
                Featured Course
              </span>
            </div>

            <div className="flex-1 p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-[#856404] text-[14px] font-bold flex items-center gap-1">
                  ★ {course?.rating}{" "}
                  <span className="text-gray-400 font-normal">
                    ({course?.students || 125} reviews)
                  </span>
                </p>

                <h2 className="text-[28px] font-extrabold text-[#0B1C30] leading-tight tracking-tight">
                  {course?.title}
                </h2>

                <div className="flex items-center gap-2.5 pt-1">
                  <span className="text-[#4A5568] font-medium text-[15px]">
                    {course?.instructor}
                  </span>
                </div>

                <p className="text-[#718096] text-[14px] leading-relaxed line-clamp-3 pt-2">
                  {course?.description}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button className="flex-1 py-3.5 bg-[#0056C6] text-white font-bold text-[15px] rounded-[12px] hover:bg-blue-700 transition-colors shadow-md shadow-blue-100">
                  Kursga kirish
                </button>

                <button className="p-3.5 border border-gray-200 hover:border-gray-300 rounded-[12px] text-gray-600 flex items-center justify-center transition-colors bg-gray-50/50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[653px] bg-white rounded-[16px] shadow-xl h-[380px] flex items-center justify-center border border-gray-100 text-gray-400">
            Kurs yuklanmoqda...
          </div>
        )}
      </div>

      
      <div className="grid grid-cols-3 gap-6 max-w-[1029px] mx-auto">
        
        <div className="bg-[#F0F4FC] rounded-[16px] p-5 flex items-center gap-4 border border-gray-100/50">
          <div className="w-12 h-12 bg-[#5EEAD4] rounded-[12px] flex items-center justify-center text-emerald-950 shrink-0">
           <LiaAwardSolid className="text-[25px] text-[#00714D]"/>
          </div>
          <div>
            <p className="text-gray-500 text-[13px] font-medium">Daily Streak</p>
            <p className="text-[#0B1C30] text-[22px] font-extrabold">
              {userData?.dailyStreak || 0} Days
            </p>
          </div>
        </div>

        
        <div className="bg-[#F0F4FC] rounded-[16px] p-5 flex items-center gap-4 border border-gray-100/50">
          <div className="w-12 h-12 bg-[#856404] rounded-[12px] flex items-center justify-center text-white shrink-0">
            <GiScrollQuill className="text-[25px] text-white"/>
          </div>
          <div>
            <p className="text-gray-500 text-[13px] font-medium">Quizzes Passed</p>
            <p className="text-[#0B1C30] text-[22px] font-extrabold">
              {userData?.quizzesPassed || 0}
            </p>
          </div>
        </div>

        
        <div className="bg-[#F0F4FC] rounded-[16px] p-5 flex items-center gap-4 border border-gray-100/50">
          <div className="w-12 h-12 bg-[#1d4ed8] rounded-[12px] flex items-center justify-center text-white shrink-0">
            <MdOutlineTimer className="text-[25px] text-white"/>
          </div>
          <div>
            <p className="text-gray-500 text-[13px] font-medium">Hours Learned</p>
            <p className="text-[#0B1C30] text-[22px] font-extrabold">
              {userData?.hoursLearned || 0}h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}