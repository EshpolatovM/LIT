import React from "react";
import { Link } from "react-router-dom";

function Card({ img, title, ism, pro, link }) {
  return (
    <div className="w-[240px] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between p-4">
      <div className="w-full h-[140px] rounded-xl overflow-hidden mb-4">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h1 className="font-bold text-[16px] text-[#0B1C30] mb-1 line-clamp-2 min-h-[48px]">
            {title}
          </h1>
          <p className="text-[14px] text-gray-500 mb-4">{ism}</p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-[12px] font-semibold text-gray-600 mb-1">
            <span>Course Progress</span>
            <span className="text-[#0056C6]">{pro}</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0056C6] h-full rounded-full"
              style={{ width: pro }}
            ></div>
          </div>
        </div>

        <Link
          to={link}
          className="w-full bg-[#0056C6] text-white font-medium text-[14px] py-2.5 rounded-xl text-center block hover:bg-[#004399] transition-all"
        >
          Continue Learning ▷
        </Link>
      </div>
    </div>
  );
}

export default Card;
