import React from "react";
import { useTheme } from "../../context/ThemeContext";

function Card({ img, title, ism, pro, youtubeUrl, imgtit }) {
  const { themeName } = useTheme();
  const isDark = themeName === "dark";

  return (
    <div
      className={`w-[240px] rounded-xl border overflow-hidden flex flex-col justify-between p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
        isDark ? "bg-[#0f1729] border-slate-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="w-full h-[140px] rounded-lg overflow-hidden mb-3">
        <img src={img} alt={imgtit} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h1
            className={`font-semibold text-sm mb-1 line-clamp-2 transition-colors duration-300 ${
              isDark ? "text-slate-200" : "text-gray-800"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-xs mb-3 transition-colors duration-300 ${
              isDark ? "text-slate-400" : "text-gray-500"
            }`}
          >
            {ism}
          </p>
        </div>

        <div className="mb-3">
          <div
            className={`flex justify-between text-xs font-medium mb-1 transition-colors duration-300 ${
              isDark ? "text-slate-400" : "text-gray-500"
            }`}
          >
            <span>Course Progress</span>
            <span className="text-blue-500">{pro}</span>
          </div>
          <div
            className={`w-full h-1.5 rounded-full overflow-hidden ${
              isDark ? "bg-slate-700" : "bg-gray-100"
            }`}
          >
            <div
              className="bg-gradient-to-r from-green-900 to-blue-300  h-full rounded-full"
              style={{ width: pro }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => window.open(youtubeUrl, "_blank")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-lg transition-all duration-200"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
}

export default Card;