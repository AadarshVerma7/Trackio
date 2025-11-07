import React, { useState, useEffect, useRef, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { useStreak } from "use-streak";

// Hook initializes streak from localStorage automatically
const today = new Date();
const streak = useStreak(localStorage, today); // handles all streak logic

// Utility: Track container width dynamically
const useContainerWidth = () => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) setWidth(entries[0].contentRect.width);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return { containerRef, width };
};

// Generate grouped heatmap data
const generateAndGroupData = (daysActive = []) => {
  const yearData = [];
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const startDate = new Date(oneYearAgo);
  const daysToRender = 371;

  for (let i = 0; i < daysToRender; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateKey = currentDate.toLocaleDateString("en-US");
    const isActive = daysActive.includes(dateKey);
    yearData.push({
      date: currentDate,
      activity: isActive ? 3 : 0,
    });
  }

  const groupedData = yearData.reduce((acc, item) => {
    const month = item.date.toLocaleString("default", { month: "short" });
    const year = item.date.getFullYear();
    const key = `${month} ${year}`;
    if (!acc[key]) {
      const firstDayOfMonth = new Date(item.date.getFullYear(), item.date.getMonth(), 1);
      acc[key] = {
        monthName: month,
        days: [],
        startDayOffset: firstDayOfMonth.getDay(),
      };
    }
    acc[key].days.push(item);
    return acc;
  }, {});
  return Object.values(groupedData);
};

// Colors for the heatmap boxes
const getActivityColor = (level) => (level === 0 ? "bg-gray-400" : "bg-green-600");

// Main Component
const ContributionGraph = ({ darkMode }) => {
  const { containerRef, width } = useContainerWidth();
  const { backendUrl } = useContext(AppContext);

  const [groupedData, setGroupedData] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(streak.currentCount);
  const [maxStreak, setMaxStreak] = useState(streak.currentCount);

  const textColor = darkMode === "light" ? "text-black" : "text-white";

  // Sync streak with backend once per new login day
  useEffect(() => {
    const updateBackendStreak = async () => {

      try {
        await axios.post(
          `${backendUrl}/api/user/updateStreak`,
          {
            currentStreak: streak.currentCount,
            startDate: streak.startDate,
            lastLoginDate: streak.lastLoginDate,
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error updating streak:", error);
      }
    };

    // Only update DB if today's login is new
    const lastSaved = localStorage.getItem("lastSavedDate");
    if (lastSaved !== streak.lastLoginDate) {
      toast.success(`🔥 +1 Day Streak!`);
      updateBackendStreak();
      localStorage.setItem("lastSavedDate", streak.lastLoginDate);
    }

    // Simulate streak activity for graph
    const daysActive = [];
    const start = new Date(streak.startDate);
    const end = new Date(streak.lastLoginDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      daysActive.push(d.toLocaleDateString("en-US"));
    }

    setGroupedData(generateAndGroupData(daysActive));
    setCurrentStreak(streak.currentCount);
    setMaxStreak((prev) => Math.max(prev, streak.currentCount));
  }, [streak.currentCount, backendUrl]);

  // Responsive grid sizing
  const NUM_COLUMNS = 53;
  const totalGapsWidth = (groupedData.length - 1) * 12;
  const totalPaddingWidth = groupedData.length * 30;
  const squareSize = (width - totalGapsWidth - totalPaddingWidth) / NUM_COLUMNS;

  return (
    <div className={`${textColor} rounded-lg w-full h-full flex flex-col`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Total active days: <span className={`${textColor} mr-5`}>{currentStreak}</span>
          Max streak: <span className={`${textColor}`}>{maxStreak}</span>
        </h2>
      </div>

      <div className="flex justify-between" ref={containerRef}>
        {width > 0 &&
          groupedData.map((monthData, monthIndex) => (
            <div key={monthIndex} className="flex flex-col">
              <div className="border-gray-600 rounded-md p-2">
                <div className="grid grid-rows-7 grid-flow-col gap-1">
                  {Array.from({ length: monthData.startDayOffset }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
                    />
                  ))}
                  {monthData.days.map((day, index) => (
                    <div
                      key={index}
                      className={`rounded-xs ${getActivityColor(day.activity)}`}
                      style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
                      title={`Date: ${day.date.toDateString()}`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className={`text-s font-bold ${textColor} mt-2 text-center`}>
                {monthData.monthName}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContributionGraph;
