import React, { useEffect, useState } from "react";
import GroupMemberList from "./GroupMemberList";
import axios from "axios";

const GroupDashboard = ({ theme, groupId }) => {
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const membersRes = await axios.get(`/api/group/${groupId}/members`, config);
      setMembers(membersRes.data.members);
      setGroupName(membersRes.data.groupName);

      const tasksRes = await axios.get(`/api/tasks/user/${groupId}`, config);
      setTasks(tasksRes.data.tasks);
    };

    fetchData();
  }, [groupId]);

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        {/* Current user's tasks */}
        <h2 className="text-2xl font-bold text-white mb-4">Your Tasks</h2>
        <ul className="space-y-3">
          {tasks.map(task => (
            <li
              key={task._id}
              className={`p-3 rounded-lg ${task.completed ? "bg-green-700" : "bg-gray-700"}`}
            >
              {task.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-[30%]">
        <GroupMemberList
          theme={theme}
          members={members}
          groupName={groupName}
          onLeave={() => console.log("Leave group")}
        />
      </div>
    </div>
  );
};

export default GroupDashboard;
