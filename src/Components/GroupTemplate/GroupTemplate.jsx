import React from "react";

function GroupTemplate({ Name, Members, Progress, Role, theme }) {
  const isDark = theme === "dark";

  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#D0C1A8]",
    secondary: isDark ? "bg-[#364153]" : "bg-[#95775A]",
    accent: isDark ? "bg-white/80" : "bg-[#7E664D]",

    card: isDark ? "bg-[#0F172A]" : "bg-[#B4A68C]",
    border: isDark ? "border-white/40" : "border-black/40",

    textPrimary: isDark ? "text-white" : "text-gray-800",
    textSecondary: isDark ? "text-white/80" : "text-gray-700",

    shadow: isDark
      ? "shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
      : "shadow-[0_4px_20px_rgba(0,0,0,0.1)]",
  };

  return (
    <div
      className={`${colors.card} rounded-xl p-6 flex flex-col justify-between ${colors.shadow} transition-transform hover:scale-[1.02] hover:shadow-lg duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <h1
          className={`text-xl fjalla font-semibold tracking-wide ${colors.textPrimary}`}
        >
          {Name}
        </h1>
        <div className="text-right">
          <p className={`text-sm ${colors.textSecondary} font-semibold`}>
            Members: {Members}
          </p>
          <p className={`text-sm ${colors.textSecondary} font-semibold`}>Role: {Role}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <div
          className={`flex justify-between text-sm mb-1 ${colors.textSecondary}`}
        >
          <span>Progress</span>
          <span>{Progress}%</span>
        </div>
        <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
          <div
            className={`h-3 ${colors.accent} rounded-full transition-all duration-700 ease-in-out`}
            style={{ width: `${Progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default GroupTemplate;
