import React from "react";
import viewResources from "../../assets/viewResources.svg";
import addResources from "../../assets/addResources.svg";
import Footer from "../Footer/Footer";

function AddResources({ theme }) {
  const isDark = theme === "dark";

  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#D0C1A8]",
    secondary: isDark ? "bg-[#0F172A]" : "bg-[#a6987f]",
    accent: "from-orange-400 to-pink-500",
    button: isDark ? "bg-gray-900" : "bg-[#95775A]",
    textPrimary: isDark ? "text-white" : "text-gray-800",
    icons: isDark ? "invert-100" : "invert-0",
    shadow: isDark
      ? "shadow-[0_10px_10px_rgba(255,255,255,0.08)]"
      : "shadow-[0_10px_10px_rgba(0,0,0,0.1)]",
  };
  return (
    <div>
      <div
        className={`flex justify-around mx-5 ${colors.primary} rounded-xl py-3`}
      >
        <div
          className={`flex gap-5 items-center justify-center cursor-pointer ${colors.secondary} px-30 py-1 rounded-lg hover:scale-[1.05] transition duration-300 ${colors.shadow}`}
        >
          <img
            src={addResources}
            alt="Add Resources"
            className={`w-10 ${colors.icons}`}
          />
          <p className={`fjalla text-2xl ${colors.textPrimary}`}>
            Add Resources
          </p>
        </div>

        <div
          className={`flex gap-5 items-center justify-center cursor-pointer ${colors.secondary} px-30 py-1 rounded-lg hover:scale-[1.05] transition duration-300 ${colors.shadow}`}
        >
          <img
            src={viewResources}
            alt="View Resources"
            className={`w-10 ${colors.icons}`}
          />
          <p className={`fjalla text-2xl ${colors.textPrimary}`}>
            View Resources
          </p>
        </div>
      </div>

      {/* <Footer theme={theme}/> */}
    </div>
  );
}

export default AddResources;
