import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const useContainerWidth = () => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries[0]) setWidth(entries[0].contentRect.width);
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return { containerRef, width };
};

const generateAndGroupData = (streakDates = []) => {
  const yearData = [];
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const startDate = new Date(oneYearAgo);
  const daysToRender = 371;

  for (let i = 0; i < daysToRender; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateKey = currentDate.toISOString().split("T")[0];
    const isStreakDay = streakDates.includes(dateKey);
    yearData.push({
      date: currentDate,
      activity: isStreakDay ? 3 : 0,
    });
  }

  const groupedData = yearData.reduce((acc, item) => {
    const month = item.date.toLocaleString('default', { month: 'short' });
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

const getActivityColor = (level) => (level === 0 ? 'bg-gray-400' : 'bg-green-600');

const ContributionGraph = ({ darkMode }) => {
  const { containerRef, width } = useContainerWidth();
  const [groupedData, setGroupedData] = useState([]);
  const textColor = darkMode === 'light' ? 'text-black' : 'text-white';

  useEffect(() => {
    const streakDates = JSON.parse(localStorage.getItem("streakDates")) || [];
    const todayKey = new Date().toISOString().split("T")[0];

    // If user hasn’t logged in today → add today’s date
    if (!streakDates.includes(todayKey)) {
      streakDates.push(todayKey);
      localStorage.setItem("streakDates", JSON.stringify(streakDates));
      toast.success("+1 Daily Login"); // 🔔 notification
    }

    const data = generateAndGroupData(streakDates);
    setGroupedData(data);
  }, []);

  const NUM_COLUMNS = 53;
  const totalGapsWidth = (groupedData.length - 1) * 12;
  const totalPaddingWidth = groupedData.length * 30;
  const squareSize = (width - totalGapsWidth - totalPaddingWidth) / NUM_COLUMNS;

  return (
    <div className={`${textColor} rounded-lg w-full h-full flex flex-col`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Total active days: <span className={`${textColor} mr-5`}>209</span> 
          Max streak: <span className={`${textColor}`}>101</span>
        </h2>
      </div>

      <div className="flex justify-between" ref={containerRef}>
        {width > 0 && groupedData.map((monthData, monthIndex) => (
          <div key={monthIndex} className="flex flex-col">
            <div className="border-gray-600 rounded-md p-2">
              <div className="grid grid-rows-7 grid-flow-col gap-1">
                {Array.from({ length: monthData.startDayOffset }).map((_, index) => (
                  <div key={`empty-${index}`} style={{ width: `${squareSize}px`, height: `${squareSize}px` }} />
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
            <div className={`text-s font-bold ${textColor} mt-2 text-center`}>{monthData.monthName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributionGraph;
