import React from "react";
import { LogOut } from "lucide-react";
import React from 'react'
import OrangeBG from '../../assets/OrangeBG.png'

const GroupMemberList = () => {
  // Dummy member progress data
  const members = [
    { name: "Member 1", progress: 80 },
    { name: "Member 2", progress: 50 },
    { name: "Member 3", progress: 70 },
    { name: "Member 4", progress: 30 },
  ];

  return (
    <div className="flex h-screen text-white items-center p-6 ">
      {/* Outer Container with margin and rounded edges */}
      <div className="w-[25%] min-h-[85vh] bg-opacity-90 shadow-2xl rounded-3xl flex flex-col justify-between p-6 space-y-6 bg-[#d0c1a8]">
        {/* Group Header */}
        <div className="relative w-full h-35 rounded-2xl overflow-hidden ">
          <img
            src="src\assets\memberListBanner.jpg"
            alt="Group Banner"
            className="w-full h-full object-cover scale-110 blur-xs "
          />
          <div className="absolute inset-0 flex items-center justify-center  bg-opacity-40 ">
            <h2 className="text-2xl font-semibold text-white">Group Name</h2>
          </div>
        </div>

        {/* Member List */}
        <div className="space-y-5">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-[#a69a86] p-3 rounded-xl shadow-md hover:bg-[#887d6d] transition-all"
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 text-lg">🧑‍🦲</span>
                  <span className="font-medium">{member.name}</span>
                </div>
                <span className="text-sm text-gray-700">{member.progress}%</span>
              </div>
              <div className="w-full h-2 bg-[#ffffff3c] rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: `${member.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave Button */}
        <button className="mt-6 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all">
          <LogOut className="w-4 h-4" /> Leave Group
    <div className="bg-white p-4 rounded-2xl w-80 flex flex-col justify-between">
      <div
        className="rounded-2xl flex justify-center items-center h-16 mb-4"
        style={{
          backgroundImage: `url(${OrangeBG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="fjalla text-white text-2xl">Group Name</h1>
      </div>

      <div className="flex flex-col gap-3 bg-gray-100 p-3 rounded-2xl shadow-inner flex-grow">
        {['Member 1', 'Member 2', 'Member 3', 'Member 4'].map((member, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-gray-300 p-3 rounded-xl shadow-sm"
          >
            <div className="bg-orange-500 p-2 rounded-full text-white">
            </div>
            <p className="fjalla text-gray-800">{member}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button className="bg-gray-300 hover:bg-gray-400 p-3 rounded-lg">
        </button>
      </div>
    </div>
  );
};

export default GroupMemberList;
