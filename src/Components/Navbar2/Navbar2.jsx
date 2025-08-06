import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import favicon from "../../assets/favIconPNG.png";
import Profile from "../../assets/Profile.svg";
import Moon from "../../assets/moon.svg";
import Sun from "../../assets/sun.svg";

function Navbar2() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 
        flex justify-between items-center my-5 w-1/2 rounded-xl py-4 px-6 
        shadow-lg shadow-black/30 transition-all duration-500 absolute">
        
        {/* Logo */}
        <div className="flex gap-2  text-lg font-semibold items-center">
          <img className="w-8" src={favicon} alt="Trackio" />
          <h1 className="lily">Trackio</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center text-lg font-semibold">
          <Link
            to="/home"
            className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
          >
            Contact
          </Link>
          <Link
            to="/groups"
            className="relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
          >
            Groups
          </Link>
        </div>

        {/* Theme + Profile Icon */}
        <div className="flex gap-4 items-center">
          <button onClick={toggleTheme}>
            <img
              className="w-8 cursor-pointer"
              src={theme === "light" ? Moon : Sun}
              alt="Toggle Theme"
              title="Toggle Theme"
            />
          </button>
          <img className="w-8 cursor-pointer" src={Profile} alt="Profile" />
        </div>
      </div>
    </div>
  );
}

export default Navbar2;
