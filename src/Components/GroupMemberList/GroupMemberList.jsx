import { LogOut } from "lucide-react";
import React,{useEffect} from "react";
import LightGroupBG from '../../assets/LightGroupBG.jpg'
import DarkGroupBG from '../../assets/DarkGroupBG.jpg'

const GroupMemberList = ({ theme, members, groupName = "Group Name", onLeave }) => {
  const isDark = theme === "dark";

  useEffect(() => {
  console.log("📈 Updated members:", members);
}, [members]);


  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#D0C1A8]",
    secondary: isDark ? "bg-[#0F172A]" : "bg-[#a6987f]",
    button: "bg-red-600",
    textPrimary: "text-white",
    title: "text-black",
    shadow: isDark
      ? "shadow-[0_2px_5px_rgba(255,255,255,0.4)]"
      : "shadow-[0_2px_5px_rgba(0,0,0,0.1)]",
    bar: isDark ? "bg-white/90" : "bg-[#4522068e]",
    bg: isDark ? DarkGroupBG : LightGroupBG,
  };

  return (
    <div
      className={`${colors.primary} bg-opacity-90 shadow-2xl rounded-3xl flex flex-col justify-between p-5`}
    >
      
      {/* Group Header */}
      <div className="relative w-full h-43 rounded-2xl overflow-hidden mb-4">
        <img
          src={colors.bg}
          alt="Group Banner"
          className="w-full h-full object-cover scale-110 blur-[2px]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
          <h2 className={`text-xl font-semibold ${colors.textPrimary}`}>
            {groupName}
          </h2>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-4 text-white">
        Group Members
      </h2>

      {/* Member List */}
      <div className="flex-1 overflow-y-auto space-y-7 pr-1">
        {members.length > 0 ? (
          members.map((member, index) => (
            <div
              key={index}
              className={`${colors.secondary} p-3 rounded-xl shadow-md transition-all`}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <i className={`fas fa-user text-lg ${colors.textPrimary}`}></i>
                  <span className="font-medium text-white">{member.name}</span>
                </div>
                <span className="text-sm text-gray-200 font-semibold">
                  {member.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#ffffff3c] rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.bar} rounded-full transition-all duration-700 ease-in-out`}
                  style={{ width: `${member.progress}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300 italic">
            No members in this group yet.
          </p>
        )}
      </div>

      {/* Leave Button */}
      <button
        onClick={onLeave}
        className={`mt-4 flex items-center justify-center gap-2 ${colors.button} text-white py-3 rounded-xl font-semibold shadow-lg transition-all hover:opacity-90`}
      >
        <LogOut className="w-4 h-4" /> Leave Group
      </button>
    </div>
  );
};

export default GroupMemberList;
