import React, { useState, useEffect, useRef } from "react";

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

const generateAndGroupData = (streakCount) => {
  const yearData = [];
  const today = new Date();
  
  // Normalize today
  today.setHours(0,0,0,0);

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const startDate = new Date(oneYearAgo);
  const daysToRender = 371;

  const activeThresholdDate = new Date(today);
  activeThresholdDate.setDate(today.getDate() - streakCount);

  for (let i = 0; i < daysToRender; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // Normalize for comparison
    currentDate.setHours(0,0,0,0);

    // Check if this date falls within the active streak range
    // Logic: If Date is > (Today - Streak) AND Date <= Today
    const isActive = currentDate > activeThresholdDate && currentDate <= today;

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

const getActivityColor = (level) => (level === 0 ? "bg-gray-300/50" : "bg-green-500");

// Main Component
// Now accepts streak/maxStreak purely as props. No internal API calls.
const ContributionGraph = ({ darkMode, streak, maxStreak }) => {
  const { containerRef, width } = useContainerWidth();
  const [groupedData, setGroupedData] = useState([]);
  
  const textColor = darkMode === "light" ? "text-black" : "text-white";

  useEffect(() => {
    // Generate graph based on the streak prop passed from Dashboard
    const data = generateAndGroupData(streak || 0);
    setGroupedData(data);
  }, [streak]);

  // Responsive grid sizing
  const NUM_COLUMNS = 53;
  const totalGapsWidth = (groupedData.length - 1) * 12;
  const totalPaddingWidth = groupedData.length * 30;
  const squareSize = Math.max(10, (width - totalGapsWidth - totalPaddingWidth) / NUM_COLUMNS);

  return (
    <div className={`${textColor} rounded-lg w-full h-full flex flex-col`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Current Streak : <span className={`text-white mr-5 text-xl`}>{streak}</span>
          Max Streak : <span className={`text-white`}>{maxStreak || streak}</span>
        </h2>
      </div>

      <div className="flex justify-between overflow-x-auto pb-2" ref={containerRef}>
        {width > 0 &&
          groupedData.map((monthData, monthIndex) => (
            <div key={monthIndex} className="flex flex-col mr-1">
              <div className="rounded-md p-1">
                <div className="grid grid-rows-7 grid-flow-col gap-1">
                  {/* Add empty placeholders for start day offset */}
                  {Array.from({ length: monthData.startDayOffset }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
                    />
                  ))}
                  {/* Render Actual Days */}
                  {monthData.days.map((day, index) => (
                    <div
                      key={index}
                      className={`rounded-xs transition-all hover:scale-125 ${getActivityColor(day.activity)}`}
                      style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
                      title={`${day.date.toDateString()}`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className={`text-[10px] font-bold ${textColor} mt-2 text-center uppercase tracking-wider opacity-70`}>
                {monthData.monthName}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContributionGraph;