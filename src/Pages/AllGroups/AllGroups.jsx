import React, { useState } from "react";
import GroupTemplate from "../../Components/GroupTemplate/GroupTemplate";

function AllGroups({ theme }) {
  const isDark = theme === "dark";

  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#D0C1A8]",
    secondary: isDark ? "bg-[#272F40]" : "bg-[#95775A]",
    accent: "from-orange-400 to-pink-500",
    button: isDark ? "bg-gray-900" : "bg-[#95775A]",
    card: isDark ? "bg-[#272F40]" : "bg-[#D0C1A8]",
    border: isDark ? "border-white/40" : "border-black/40",
    textPrimary: isDark ? "text-white" : "text-gray-800",
    shadow: isDark
      ? "shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
      : "shadow-[0_4px_20px_rgba(0,0,0,0.1)]",
  };

  const [searchTerm, setSearchTerm] = useState("");

  const groups = [
    { Name: "Group 1", Members: 4, Progress: 69, Role: "Member" },
    { Name: "Group 2", Members: 5, Progress: 45, Role: "Admin" },
    { Name: "Group 3", Members: 7, Progress: 90, Role: "Admin" },
    { Name: "Group 4", Members: 3, Progress: 20, Role: "Member" },
  ];

  const filteredGroups = groups.filter((group) =>
    group.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-10">
      <div
        className={`${colors.primary} mx-6 my-4 p-5 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 ${colors.shadow}`}
      >
        <h1
          className={`fjalla font-semibold text-2xl tracking-wide ${colors.textPrimary}`}
        >
          Groups
        </h1>

        <div className="flex justify-center items-center gap-3 w-full sm:w-auto">
          <input
            className={`border ${colors.border} ${colors.textPrimary} rounded-xl text-md px-3 py-2 w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-[#95775A] transition`}
            type="text"
            name="group"
            id="group"
            placeholder="Search for a group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setSearchTerm(searchTerm.trim())}
            className={`${colors.button} text-white fjalla rounded-xl px-4 py-2 tracking-wide cursor-pointer hover:opacity-90 transition`}
          >
            Search
          </button>
        </div>
      </div>

      {/* Groups Grid */}
      <div
        className={`${colors.primary} mx-6 my-4 p-6 rounded-xl grid gap-6 sm:grid-cols-2 grid-cols-1 ${colors.shadow}`}
      >
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, index) => (
            <GroupTemplate
              key={index}
              Name={group.Name}
              Members={group.Members}
              Progress={group.Progress}
              Role={group.Role}
              theme={theme}
            />
          ))
        ) : (
          <p
            className={`col-span-full text-center text-lg fjalla ${colors.textPrimary}`}
          >
            No groups found.
          </p>
        )}
      </div>
    </div>
  );
}

export default AllGroups;
