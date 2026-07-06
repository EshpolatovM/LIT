import { useState, useEffect } from "react";
import { IoMdTrendingUp } from "react-icons/io";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null);

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
      } catch (err) {
        console.log("Ma'lumot yuklashda xatolik:", err);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Xush Kelibsiz, {userName}!</h1>
      <p className="text-gray-600 mb-12">
        O'quv rejangiz bo'yicha davom eting.
      </p>
      <div className="flex justify-center items-center gap-5">
        <div className="w-[350px]  bg-white rounded-[16px] shadow-xl w-[314px] h-[390px] p-6 flex flex-col justify-between border border-gray-100">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-[20px] font-bold text-[#0B1C30]">
                My Learning Progress
              </h1>
              <IoMdTrendingUp className="text-[#006C49] text-2xl" />
            </div>

            <div className="space-y-5">
              {enrollments.map((enrollment) => {
                const course = courses.find((c) => c.id == enrollment.courseId);
                if (!course) return null;

                return (
                  <div key={enrollment.id} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-[14px] text-[#0B1C30]">
                        {course.title}
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
        <div className="w-[653px] rounded-[16px] shadow-xl h-[380px]">
          <div className="">
            <img className="w-[325px] h-[378px] object-cover rounded-bl-[16px] rounded-tl-[16px]" src="https://th.bing.com/th/id/OIP.I_K3Qgjq0gxINQDoqEq5UAHaFj?w=244&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="react rasm" />
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
