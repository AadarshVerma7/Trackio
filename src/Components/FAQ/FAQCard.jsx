import React, { useState, useRef, useEffect } from "react";

function FAQCard({ question, answer, theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  const isDark = theme === "dark";

  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#f1e0c5]",
    secondary: isDark ? "bg-[#364153]" : "bg-[#da966f]",
    accent: isDark ? "bg-[#364153]" : "bg-[#da966f]",
    textPrimary: isDark ? "text-white" : "text-white",
    textSecondary: isDark ? "text-gray-300" : "text-gray-700",
    border: isDark ? "border-white/20" : "border-black/20",
    shadow: isDark
      ? "shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
      : "shadow-[0_4px_20px_rgba(0,0,0,0.1)]",
  };

  const toggleOpen = () => setIsOpen((prev) => !prev);

  // Dynamically calculate height to make animation smoother
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={`w-full mb-1`}>
      {/* Header */}
      <button
        className={`${colors.secondary} w-full flex justify-between items-center py-3 px-6 rounded-md cursor-pointer transition-transform duration-300 hover:scale-[1.01]`}
        onClick={toggleOpen}
      >
        <h1 className={`text-lg sm:text-xl font-semibold ${colors.textPrimary}`}>
          {question}
        </h1>
        <span
          className={`text-xl transform transition-transform duration-300 ${colors.textPrimary} ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        className={`${colors.accent} overflow-hidden transition-all duration-500 ease-in-out rounded-md m-2`}
        style={{ height }}
      >
        <div className="p-4">
          <p className={`text-md sm:text-lg leading-relaxed ${colors.textPrimary}`}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQCard;
