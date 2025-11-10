import React, { useContext, useEffect, useState } from "react";
import GroupTemplate from "../../Components/GroupTemplate/GroupTemplate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function AllGroups({ theme }) {
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

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
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    console.log("🔄 Fetching groups for the user...");

    try {
      const response = await fetch(`${backendUrl}/api/group/my-groups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      console.log("📥 Response status:", response.status);
      const result = await response.json();
      console.log("📦 Raw groups API response:", result);

      if (result.success) {
        const groupsWithProgress = await Promise.all(
          result.groups.map(async (group, idx) => {
            console.log(`🔍 Fetching progress for group[${idx}] →`, group.groupName, "(", group._id, ")");

            try {
              const res = await fetch(`${backendUrl}/api/tasks/progress/${group._id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });

              console.log(`📥 Progress API status for ${group.groupName}:`, res.status);
              const data = await res.json();
              console.log(`📊 Progress API response for ${group.groupName}:`, data);

              if (res.ok && data.success) {
                console.log(`✅ Setting progress for ${group.groupName}: ${data.progress}%`);
                return { ...group, userProgress: data.progress };
              } else {
                console.warn(`⚠️ No progress data for ${group.groupName}. Defaulting to 0%.`);
                return { ...group, userProgress: 0 };
              }
            } catch (err) {
              console.error(`❌ Error fetching progress for ${group.groupName}:`, err);
              return { ...group, userProgress: 0 };
            }
          })
        );

        console.log("✅ Final groups with progress:", groupsWithProgress);
        setGroups(groupsWithProgress);
      } else {
        console.error("❌ Failed to load groups:", result.message);
        toast.error(result.message || "Failed to load groups");
      }
    } catch (error) {
      console.error("💥 Error fetching groups:", error);
      toast.error("Something went wrong while fetching groups");
    } finally {
      console.log("✅ Finished fetching all groups");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("🔎 Filtered groups to render:", filteredGroups.map(g => ({
    name: g.groupName,
    progress: g.userProgress
  })));

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

      <div
        className={`${colors.primary} mx-6 my-4 p-6 rounded-xl grid gap-6 sm:grid-cols-2 grid-cols-1 ${colors.shadow}`}
      >
        {loading ? (
          <p className={`col-span-full text-center text-lg fjalla ${colors.textPrimary}`}>
            Loading groups...
          </p>
        ) : filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <div
              key={group._id}
              onClick={() => {
                console.log(`➡️ Navigating to group: ${group.groupName} (${group.groupId})`);
                navigate(`/groups/${group.groupId}`);
              }}
              className="cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <GroupTemplate
                Name={group.groupName}
                Members={group.members.length}
                Progress={group.userProgress || 0}
                Role={
                  group.admin === localStorage.getItem("userId")
                    ? "Admin"
                    : "Member"
                }
                theme={theme}
              />
            </div>
          ))
        ) : (
          <p className={`col-span-full text-center text-lg fjalla ${colors.textPrimary}`}>
            No groups found.
          </p>
        )}
      </div>
    </div>
  );
}

export default AllGroups;
