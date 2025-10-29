import React, { useState, useEffect, useRef } from 'react';

// This is a custom hook to measure an element's width
const useContainerWidth = () => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return { containerRef, width };
};


// Data generation and color functions remain the same
const generateAndGroupData = () => {
  const yearData = [];
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  
  const startDate = new Date(oneYearAgo);
  const daysToRender = 371;

  for (let i = 0; i < daysToRender; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    if (currentDate < today) {
      yearData.push({
        date: currentDate,
        activity: Math.floor(Math.random() * 5),
      });
    }
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

const getActivityColor = (level) => {
  if (level === 0) return 'bg-gray-400';
  if (level === 1) return 'bg-green-900';
  if (level === 2) return 'bg-green-700';
  if (level === 3) return 'bg-green-500';
  if (level === 4) return 'bg-green-300';
};

const ContributionGraph = ({darkMode}) => {
  const { containerRef, width } = useContainerWidth();
  const [groupedData] = useState(()=>generateAndGroupData());
  const textColor=darkMode=='light'?'text-black':'text-white';

  // --- CALCULATION LOGIC ---
  // We have 53 potential columns (weeks) in a year.
  const NUM_COLUMNS = 53;
  // Account for gaps between months and padding inside the containers
  const totalGapsWidth = (groupedData.length -1) * 12; // 12px gap
  const totalPaddingWidth = groupedData.length * 30; // 8px padding on each side
  // Calculate the size of each square
  const squareSize = (width - totalGapsWidth - totalPaddingWidth) / NUM_COLUMNS;

  return (
    <div className={`${textColor} rounded-lg w-full h-full flex flex-col`}>
      {/* Header Section*/}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Total active days: <span className={`${textColor} mr-5`}>209</span> Max streak: <span className={`${textColor}`}>101</span>
        </h2>
      </div>

      {/* Main container that we measure */}
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
                    // Apply calculated size directly
                    style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
                    title={`Date: ${day.date.toDateString()}, Activity: ${day.activity}`}
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