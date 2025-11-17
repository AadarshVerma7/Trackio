import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import GroupTemplate from "../../Components/GroupTemplate/GroupTemplate";
import { AppContext } from "../../context/AppContext";
import CreateGroup from "../CreateGroup/CreateGroup.jsx";

function AllGroups({ theme }) {
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#D0C1A8]",
    secondary: isDark ? "bg-[#1e2535]" : "bg-[#CBB698]",
    button: isDark ? "bg-gray-900" : "bg-[#95775A]",
    border: isDark ? "border-white/40" : "border-black/40",
    textPrimary: isDark ? "text-white" : "text-gray-800",
    textSecondary: isDark ? "text-gray-400" : "text-gray-600",
    shadow: isDark
      ? "shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
      : "shadow-[0_4px_20px_rgba(0,0,0,0.1)]",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortLabel, setSortLabel] = useState("Sort by");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [viewType, setViewType] = useState("grid");
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const fetchGroups = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/group/my-groups`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (!result.success) {
        toast.error(result.message || "Failed to load groups");
        return;
      }

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
            return {
              ...group,
              userProgress: res.ok && data.success ? data.progress : 0,
            };
          } catch {
            return { ...group, userProgress: 0 };
          }
        })
      );

      setGroups(groupsWithProgress);
    } catch {
      toast.error("Error fetching groups");
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
          groups.reduce((sum, g) => sum + (g.userProgress || 0), 0) /
            groups.length
        )
      : 0;

  return (
    <div className="my-10 px-6 sm:px-10">
      {/* HEADER BAR */}
      <div
        className={`${colors.primary} p-5 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 ${colors.shadow}`}
      >
        <h1 className={`fjalla font-semibold text-2xl ${colors.textPrimary}`}>
          Groups
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {/* SEARCH */}
          <input
            className={`border ${colors.border} ${colors.textPrimary} rounded-xl px-3 py-2 w-52 sm:w-60 focus:ring-2 transition`}
            type="text"
            placeholder="Search for a group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* SORT DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(true)}
              className={`border ${colors.border} ${colors.textPrimary} rounded-xl px-3 py-2 ${colors.primary}`}
            >
              {sortLabel}
            </button>

            {showSortDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSortDropdown(false)}
                ></div>

                <div
                  className={`absolute right-0 mt-2 w-40 rounded-xl border z-50 ${
                    isDark ? "bg-[#1e2535] border-gray-700" : "bg-white border-gray-300"
                  }`}
                >
                  {[
                    { label: "Name", value: "name" },
                    { label: "Members", value: "members" },
                    { label: "Progress", value: "progress" },
                  ].map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => {
                        setSortLabel(opt.label);
                        setSortType(opt.value);
                        setShowSortDropdown(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* VIEW SWITCH */}
          <button
            onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
            className={`${colors.button} text-white px-4 py-2 rounded-lg`}
          >
            {viewType === "grid" ? "List View" : "Grid View"}
          </button>

          {/* CREATE GROUP BTN */}
          <button
            onClick={() => setShowCreateGroup(true)}
            className={`${colors.button} text-white px-4 py-2 rounded-lg`}
          >
            + Create Group
          </button>
        </div>
      </div>

      {/* STATS */}
      {!loading && (
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div className={`${colors.secondary} rounded-xl p-4 text-center ${colors.shadow}`}>
            <p className={colors.textSecondary}>Total Groups</p>
            <h2 className={`text-2xl font-semibold ${colors.textPrimary}`}>{totalGroups}</h2>
          </div>

          <div className={`${colors.secondary} rounded-xl p-4 text-center ${colors.shadow}`}>
            <p className={colors.textSecondary}>You Admin</p>
            <h2 className={`text-2xl font-semibold ${colors.textPrimary}`}>{adminGroups}</h2>
          </div>

          <div className={`${colors.secondary} rounded-xl p-4 text-center ${colors.shadow}`}>
            <p className={colors.textSecondary}>Average Progress</p>
            <h2 className={`text-2xl font-semibold ${colors.textPrimary}`}>{avgProgress}%</h2>
          </div>
        </div>
      )}

      {/* GROUP LIST */}
      <div className={`${colors.primary} mt-6 p-6 rounded-xl ${colors.shadow}`}>
        {loading ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl h-40 bg-gray-300 dark:bg-gray-700"></div>
            ))}
          </div>
        ) : filteredGroups.length > 0 ? (
          <div
            className={
              viewType === "grid"
                ? "grid sm:grid-cols-2 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredGroups.map((group) => (
              <motion.div
                key={group._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/groups/${group.groupId}`)}
                className="cursor-pointer relative"
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
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
              alt="No groups"
              className="w-32 opacity-80 mb-3"
            />
            <p className={`text-lg fjalla ${colors.textPrimary}`}>
              No groups found 😕
            </p>
            <button
              onClick={() => setShowCreateGroup(true)}
              className={`${colors.button} text-white px-5 py-2 mt-3 rounded-xl`}
            >
              Create your first group
            </button>
          </div>
        )}
      </div>

      {showCreateGroup && (
        <div className="overlay">
          <CreateGroup close3={() => setShowCreateGroup(false)} theme={theme} />
        </div>
      )}
    </div>
  );
}

export default AllGroups;
