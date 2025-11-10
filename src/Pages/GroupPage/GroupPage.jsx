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
          console.log("Fetched Group : ",res.data.group);
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

  return (
    <>
      <div className="flex p-8">
        <div className="w-3/4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#272F40] text-white shadow-md">
            <h1 className="text-3xl font-bold">{group.groupName}</h1>
            <p className="text-gray-300 mt-2">{group.description}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add Resources
              </button>
              <button
                onClick={() => setShowViewModal(true)}
                className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
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
            onLeave={handleLeaveGroup}
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
