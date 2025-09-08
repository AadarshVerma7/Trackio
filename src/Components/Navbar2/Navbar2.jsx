import React, { useState } from "react";
import { Link } from "react-router-dom";
import favicon from "../../assets/favIconPNG.png";
import Profile from "../../assets/Profile.svg";
import Moon from "../../assets/moon.svg";
import Sun from "../../assets/sun.svg";

function Navbar2({theme,toggleTheme}) {
  

  return (
    <nav className="relative top-5 left-1/2 transform -translate-x-1/2 w-11/12 md:w-1/2 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg shadow-black/30 px-6 py-4 flex justify-between items-center z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img className="w-8" src={favicon} alt="Trackio" />
        <h1 className="lily text-2xl font-semibold">Trackio</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center text-lg font-semibold fjalla tracking-wide">
        {["Home", "About Us", "Contact", "Groups"].map((link) => (
          <Link
            key={link}
            to={`/${link.toLowerCase().replace(/\s/g, "")}`}
            className="relative after:block after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
          >
            {link}
          </Link>
        ))}
      </div>

      {/* Theme + Profile Icon */}
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme}>
          <img
            className="w-8 cursor-pointer"
            src={theme === "light" ? Sun : Moon}
            alt="Toggle Theme"
            title="Toggle Theme"
          />
        </button>
        <Link
        to="/profile"
        ><img className="w-8 cursor-pointer" src={Profile} alt="Profile" title="Profile"/></Link>
      </div>
    </nav>
  );
}

export default Navbar2;
