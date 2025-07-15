import React from "react";
import favicon from '../../assets/favIconPNG.png'
function Navbar() {
  return (
    <div className="w-full px-6 py-4 flex justify-between items-center">
      <div className="text-3xl font-bold text-orange-400 flex gap-3">
        <img className="h-10 " src={favicon} alt="T" />
        <h1>Trackio</h1>
      </div>

      <div className="hidden md:flex space-x-8 text-gray-700 text-lg font-medium">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Join Us</a>
      </div>

      <div className="flex space-x-4">
        <button className="px-4 py-2 border border-orange-400 text-orange-400 rounded-full hover:bg-orange-400 hover:text-white transition cursor-pointer">
          Login
        </button>
        <button className="px-4 py-2 border border-white bg-orange-400 text-white rounded-full hover:bg-white hover:text-orange-400 transition hover:border cursor-pointer hover:border-orange-400">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
