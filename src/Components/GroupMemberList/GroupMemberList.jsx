import { LogOut } from "lucide-react";
import React from "react";

const GroupMemberList = () => {
  const members = [
    { name: "Member 1", progress: 60 },
    { name: "Member 2", progress: 40 },
    { name: "Member 3", progress: 70 },
    { name: "Member 4", progress: 30 },
  ];

  return (
    <div className="bg-[#d0c1a8] bg-opacity-90 shadow-2xl rounded-3xl flex flex-col justify-between h-full p-5">
      {/* Group Header */}
      <div className="relative w-full h-35 rounded-2xl overflow-hidden mb-4">
        <img
          src="src/assets/memberListBanner.jpg"
          alt="Group Banner"
          className="w-full h-full object-cover scale-110 blur-[2px]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
          <h2 className="text-xl font-semibold text-black">Group Name</h2>
        </div>
      </div>

      {/* Member List */}
      <div className="flex-1 overflow-y-auto space-y-7 pr-1">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-[#b4a68c] p-3 rounded-xl shadow-md hover:bg-[#a6987f] transition-all"
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <i className="fas fa-user text-lg text-[#766f63]"></i>
                <span className="font-medium text-white">{member.name}</span>
              </div>
              <span className="text-sm text-gray-200 font-semibold">
                {member.progress}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#ffffff3c] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4522068e] rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${member.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Leave Button */}
      <button className="mt-4 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all">
        <LogOut className="w-4 h-4" /> Leave Group
      </button>
    </div>
  );
};

export default GroupMemberList;
