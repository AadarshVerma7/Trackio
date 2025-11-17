import React, { useState, useEffect, useContext } from "react";
import GroupMemberToDo from "../../Components/GroupMemberToDo/GroupMemberToDo";
import GroupMemberList from "../../Components/GroupMemberList/GroupMemberList";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import AddResourceModal from "../../Components/AddResourceModel/AddResourceModel.jsx";
import ViewResourcesModal from "../../Components/ViewResourceModel/ViewResourceModel.jsx";

function GroupPage({ theme }) {
  const isDark = theme === "dark";
  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#D0C1A8]",
    secondary: isDark ? "bg-[#0F172A]" : "bg-[#a6987f]",
    button: isDark ? "bg-gray-900" : "bg-[#95775A]",
    buttonPrimary: isDark ? "bg-[#101828]" : "bg-[#95775A]",
    buttonSecondary: isDark ? "bg-[#18243b]" : "bg-[#a38466]",
    textPrimary: isDark ? "text-white" : "text-gray-800",
    textMuted: isDark ? "text-gray-400" : "text-gray-900",
  };


  const { backendUrl } = useContext(AppContext);
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [membersWithProgress, setMembersWithProgress] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [resources, setResources] = useState([]);

  const token = localStorage.getItem("token");
  let currentUserId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      currentUserId = decoded.id || decoded._id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const handleLeaveGroup = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/group/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ groupId }),
        credentials: "include",
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        navigate("/groups");
      } else {
        toast.error(result.message || "Failed to leave group");
      }
    } catch (error) {
      console.error("Error leaving group:", error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/group/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ groupId }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Group deleted successfully");
        navigate("/groups");
      } else {
        toast.error(result.message || "Failed to delete group");
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      toast.error("Something went wrong");
    }
  };


  // fetch current user's progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/tasks/progress/${groupId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.data.success) setProgress(res.data.progress);
      } catch (err) {
        console.error("Error fetching user progress:", err);
      }
    };

    if (groupId) fetchUserProgress();
  }, [backendUrl, groupId]);

  // fetch all members' progress
  useEffect(() => {
    const fetchGroupProgress = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        };
        const res = await axios.get(`${backendUrl}/api/tasks/group/${groupId}/progress`, config);
        if (res.data.success) {
          setMembersWithProgress(res.data.members || []);
        } else {
          console.error("Failed to fetch group progress:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching group progress:", err);
      }
    };

    if (groupId) fetchGroupProgress();
  }, [backendUrl, groupId, progress]);

  // fetch group data
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/group/my-groups/${groupId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.data.success) {
          setGroup(res.data.group);
          setLoading(false);
          console.log("Fetched Group : ", res.data.group);
        } else {
          console.error("Failed to fetch group:", res.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching group data:", error);
        setLoading(false);
      }
    };

    if (groupId) fetchGroupData();
  }, [backendUrl, groupId]);

  // handle adding new resource
  const handleAddResource = (newRes) => {
    setResources((prev) => [...prev, newRes]);
    toast.success("Resource added successfully!");
  };

  if (loading) return <p className="text-center text-white mt-10">Loading group...</p>;
  if (!group) return <p className="text-center text-red-500 mt-10">Group Not Found</p>;
  const adminId =
    typeof group.admin === "string"
      ? group.admin
      : group.admin?._id;

  const isAdmin = adminId === currentUserId;


  return (
    <>
      <div className="flex p-8">
        <div className="w-3/4 space-y-4">
          <div className={`mx-6 mt-4 p-4 rounded-2xl ${colors.primary} ${colors.textPrimary} shadow-md`}>
            <div className={`grid grid-cols-2 items-start`}>
              {/* LEFT SIDE: Name + Description */}
              <div>
                <h1 className={`text-3xl ${colors.textPrimary} font-bold`}>
                  {group.groupName}
                </h1>

                <p className={`${colors.textMuted} mt-2`}>
                  {group.description}
                </p>
              </div>

              {/* RIGHT SIDE: Copy Group ID */}
              <div className={`flex  justify-end`}>
                <div className={`p-3 rounded-xl flex items-center gap-3`}>
                  <span className={`${colors.textPrimary} font-semibold`}>
                    Group ID : {group.groupId}
                  </span>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(group.groupId);
                      toast.success("Group ID copied to Clipboard!");
                    }}
                    className={`px-3 py-1 rounded-lg font-semibold hover:scale-[1.05] cursor-pointer`}
                  >
                    <i className="fa-regular fa-copy text-xl"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setShowAddModal(true)}
                className={`${colors.buttonPrimary} px-4 py-2 rounded-lg font-semibold hover:scale-[1.02] duration-300 transition cursor-pointer`}
              >
                Add Resources
              </button>
              <button
                onClick={() => setShowViewModal(true)}
                className={`${colors.buttonSecondary} px-4 py-2 rounded-lg font-semibold hover:scale-[1.02] duration-300 transition cursor-pointer`}
              >
                View Resources
              </button>
            </div>
          </div>

          <GroupMemberToDo
            theme={theme}
            todoList={group.todoList || []}
            groupId={groupId}
            onProgressUpdate={(newProgress) => setProgress(newProgress)}
          />
        </div>

        <div className="w-1/4 pt-5">
          <GroupMemberList
            theme={theme}
            members={membersWithProgress}
            groupName={group.groupName}
            onLeave={isAdmin ? handleDeleteGroup : handleLeaveGroup}
            isAdmin={isAdmin}
          />
        </div>
      </div>

      {showAddModal && group && (
        <AddResourceModal
          onClose={() => setShowAddModal(false)}
          onAddResource={handleAddResource}
          groupId={group._id}
        />
      )}

      {showViewModal && (
        <ViewResourcesModal
          onClose={() => setShowViewModal(false)}
          groupId={group._id}
        />
      )}
    </>
  );
}

export default GroupPage;
