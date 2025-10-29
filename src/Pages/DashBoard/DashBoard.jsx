import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import ContributionGraph from "./StreakCalendar";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import sourceData from "./sourceData.json";

function DashBoard({ theme }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const isDark = theme === "dark";

  // Theme colors
  const colors = {
    primary: isDark ? "bg-[#1E1E1E]" : "bg-[#F8F2E7]",
    card: isDark ? "bg-white/10" : "bg-[#EADBC8]/70",
    textPrimary: isDark ? "text-white" : "text-gray-800",
    textSecondary: isDark ? "text-gray-300" : "text-gray-700",
    accent: "from-orange-400 to-pink-500",
    shadow: isDark
      ? "shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
      : "shadow-[0_4px_20px_rgba(0,0,0,0.1)]",
  };

  return (
    <div
      className={`min-h-screen px-8 py-6 transition-colors duration-500 text-gray-200`}
    >
      {/* GRID LAYOUT */}
      <div className="grid grid-cols-[22%_78%] gap-6 h-full pt-5">
        {/* SIDEBAR */}
        <aside
          className={`${colors.card} ${colors.shadow} rounded-2xl p-6 flex flex-col items-center justify-between`}
        >
          {/* PROFILE */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-orange-400/60 shadow-lg">
              <img
                src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className={`text-2xl font-semibold ${colors.textPrimary}`}>
              Aayush Vats
            </h2>
            <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
              Edit Profile
            </button>
          </div>

          {/* STATS */}
          <div className="w-full mt-8">
            <h3
              className={`text-center text-2xl font-semibold mb-4 bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent`}
            >
              Stats
            </h3>

            <ul className={`text-lg space-y-4 ${colors.textSecondary}`}>
              <li className="flex items-center gap-3">
                <i className="fas fa-users text-orange-400"></i> Groups: 3
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-clipboard-list text-orange-400"></i> Quizzes: 12
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-trophy text-orange-400"></i> Points: 123
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-award text-orange-400"></i> Rank: 12
              </li>
            </ul>

            <div className="flex justify-between mt-8">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition-all">
                Logout
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition-all">
                Support
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="flex flex-col gap-6">
          {/* CONTRIBUTION GRAPH */}
          <div
            className={`${colors.card} ${colors.shadow} rounded-2xl p-6 transition-all`}
          >
            <ContributionGraph darkMode={theme} />
          </div>

          {/* CHART + GROUPS GRID */}
          <div className="grid grid-cols-2 gap-6">
            {/* DOUGHNUT CHART CARD */}
            <div
              className={`${colors.card} ${colors.shadow} rounded-2xl flex justify-center items-center p-6`}
            >
              <div className="w-[400px] h-[320px]">
                <Doughnut
                  data={{
                    labels: sourceData.map((d) => d.label),
                    datasets: [
                      {
                        data: sourceData.map((d) => d.value),
                        backgroundColor: [
                          "rgba(249, 115, 22, 0.9)",
                          "rgba(229, 231, 235, 0.7)",
                        ],
                        cutout: "65%",
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          color: isDark ? "#fff" : "#333",
                          font: { size: 14 },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* GROUP DETAILS CARD */}
            <div
              className={`${colors.card} ${colors.shadow} rounded-2xl p-6 flex flex-col`}
            >
              <h2
                className={`text-2xl font-semibold mb-4 text-center bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent`}
              >
                View Group Details
              </h2>

              {/* SEARCH */}
              <div className="flex items-center justify-between mb-6">
                <div className="relative w-2/3">
                  {!inputValue && (
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <i className="fas fa-search"></i>
                    </div>
                  )}
                  <input
                    type="text"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none ${
                      isDark
                        ? "bg-transparent border-gray-700 text-white"
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                    placeholder="Search Groups"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </div>

                <select
                  className={`px-4 py-2 rounded-lg border ${
                    isDark
                      ? "bg-gray-700 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                >
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* GROUP CARDS */}
              <div className="grid grid-cols-2 gap-5 justify-items-center">
                {["React Group", "HTML Group", "CSS Group", "JavaScript Group"].map(
                  (group) => (
                    <div
                      key={group}
                      className={`w-[150px] text-center py-6 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-md ${
                        isDark
                          ? "bg-white/5 border-gray-600 hover:bg-orange-500/20"
                          : "bg-white/70 border-gray-300 hover:bg-orange-100"
                      }`}
                    >
                      <p
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {group}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashBoard;
