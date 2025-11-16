import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import GroupTemplate from "../../Components/GroupTemplate/GroupTemplate";
import { AppContext } from "../../context/AppContext";

function AllGroups({ theme }) {
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#D0C1A8]",
    secondary: isDark ? "bg-[#1e2535]" : "bg-[#CBB698]",
    accent: "from-orange-400 to-pink-500",
    button: isDark ? "bg-gray-900" : "bg-[#95775A]",
    card: isDark ? "bg-[#272F40]" : "bg-[#D0C1A8]",
    border: isDark ? "border-white/40" : "border-black/40",
    textPrimary: isDark ? "text-white" : "text-gray-800",
    textSecondary: isDark ? "text-gray-400" : "text-gray-600",
    shadow: isDark
      ? "shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
      : "shadow-[0_4px_20px_rgba(0,0,0,0.1)]",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/group/my-groups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        const groupsWithProgress = await Promise.all(
          result.groups.map(async (group) => {
            try {
              const res = await fetch(
                `${backendUrl}/api/tasks/progress/${group._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              const data = await res.json();
              if (res.ok && data.success) {
                return { ...group, userProgress: data.progress };
              } else {
                return { ...group, userProgress: 0 };
              }
            } catch {
              return { ...group, userProgress: 0 };
            }
          })
        );
        setGroups(groupsWithProgress);
      } else {
        toast.error(result.message || "Failed to load groups");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const filteredGroups = groups
    .filter((group) =>
      group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "name") return a.groupName.localeCompare(b.groupName);
      if (sortType === "members") return b.members.length - a.members.length;
      if (sortType === "progress") return b.userProgress - a.userProgress;
      return 0;
    });

  const totalGroups = groups.length;
  const adminGroups = groups.filter(
    (g) => g.admin === localStorage.getItem("userId")
  ).length;
  const avgProgress =
    groups.length > 0
      ? Math.round(
          groups.reduce((a, b) => a + (b.userProgress || 0), 0) / groups.length
        )
      : 0;

  return (
    <div className="my-10 px-6 sm:px-10">
      {/* Breadcrumb + Header */}
      <p className={`text-sm mb-1 ${colors.textSecondary}`}>
        Dashboard / Groups
      </p>
      <div
        className={`${colors.primary} p-5 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 ${colors.shadow}`}
      >
        <h1
          className={`fjalla font-semibold text-2xl tracking-wide ${colors.textPrimary}`}
        >
          Groups
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <input
            className={`border ${colors.border} ${colors.textPrimary} rounded-xl text-md px-3 py-2 w-52 sm:w-60 focus:outline-none focus:ring-2 focus:ring-[#95775A] transition`}
            type="text"
            placeholder="Search for a group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className={`border ${colors.border} ${colors.textPrimary} rounded-xl text-sm px-3 py-2 
            ${colors.primary} 
            focus:outline-none focus:ring-2 focus:ring-[#95775A]`}
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="members">Members</option>
            <option value="progress">Progress</option>
          </select>
          <button
            onClick={() => navigate("/create-group")}
            className={`${colors.button} text-white fjalla rounded-xl px-4 py-2 tracking-wide cursor-pointer hover:opacity-90 transition`}
          >
            + Create Group
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      {!loading && (
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div
            className={`${colors.secondary} rounded-xl p-4 text-center ${colors.shadow}`}
          >
            <p className={`text-md ${colors.textSecondary}`}>Total Groups</p>
            <h2 className={`text-2xl font-semibold ${colors.textPrimary}`}>
              {totalGroups}
            </h2>
          </div>
          <div
            className={`${colors.secondary} rounded-xl p-4 text-center ${colors.shadow}`}
          >
            <p className={`text-md ${colors.textSecondary}`}>You Admin</p>
            <h2 className={`text-2xl font-semibold ${colors.textPrimary}`}>
              {adminGroups}
            </h2>
          </div>
          <div
            className={`${colors.secondary} rounded-xl p-4 text-center ${colors.shadow}`}
          >
            <p className={`text-md ${colors.textSecondary}`}>
              Average Progress
            </p>
            <h2 className={`text-2xl font-semibold ${colors.textPrimary}`}>
              {avgProgress}%
            </h2>
          </div>
        </div>
      )}

      {/* Groups Section */}
      <div
        className={`${colors.primary} mt-6 p-6 rounded-xl grid gap-6 sm:grid-cols-2 ${colors.shadow}`}
      >
        {loading ? (
          <div className="col-span-full grid sm:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl h-40 bg-gray-300 dark:bg-gray-700"
              ></div>
            ))}
          </div>
        ) : filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <motion.div
              key={group._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/groups/${group.groupId}`)}
              className="cursor-pointer relative"
            >
              {group.userProgress > 50 && (
                <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded-md">
                  Active 🔥
                </span>
              )}
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
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col justify-center items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
              alt="No groups"
              className="w-32 opacity-80 mb-3"
            />
            <p className={`text-lg fjalla ${colors.textPrimary}`}>
              No groups found 😕
            </p>
            <button
              onClick={() => navigate("/create-group")}
              className={`${colors.button} text-white fjalla rounded-xl px-5 py-2 mt-3 hover:opacity-90 transition`}
            >
              Create your first group
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllGroups;
