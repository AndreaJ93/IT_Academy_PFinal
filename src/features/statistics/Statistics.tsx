import { useState } from "react";

import { Link, Outlet } from "react-router-dom";

const Statistics = () => {
  const [stateStatistics, setStateStatistics] = useState<string>("general");

  return (
    <div className="p-3">
      <div className="">
        <div className="grid grid-cols-2 text-center bg-white rounded-3xl shadow-md">
          <button
            className={`p-2 ${
              stateStatistics === "general"
                ? " bg-[#D3E3EC] rounded-s-3xl font-bold"
                : null
            }`}
            onClick={() => setStateStatistics("general")}
          >
            <Link to="/statistics/general">
              <div>General</div>
            </Link>
          </button>
          <button
            className={` p-2   ${
              stateStatistics === "charts"
                ? " bg-[#D3E3EC] rounded-e-3xl font-bold"
                : null
            }`}
            onClick={() => setStateStatistics("charts")}
          >
            <Link to="/statistics/charts">
              <div>Gráficos</div>
            </Link>
          </button>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Statistics;
