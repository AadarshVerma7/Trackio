import React, { useState, useEffect, useContext } from "react";
import { CheckCircle, PlusCircle } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const GroupMemberToDo = ({ theme, groupId, onProgressUpdate }) => {
  const isDark = theme === "dark";
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { backendUrl } = useContext(AppContext);

  const fetchProgress = async()=>{
    try {
      const res = await fetch(`${backendUrl}/api/tasks/progress/${groupId}`,{
        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
      });

      const data = await res.json();
      if(res.ok){
        console.log("User Progress : ",data.progress);
        if(typeof onProgressUpdate === "function"){
          onProgressUpdate(data.progress);
        }
      }
    } catch (error) {
      console.error("Error fetching progress : ",error);
    }
  }

  // Fetch all tasks for a group
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/tasks/user/${groupId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await res.json();
      console.log("📦 Fetched tasks from backend:", data.tasks);
      if (Array.isArray(data.tasks)) {
        setPending(data.tasks.filter((t) => !t.completed));
        setCompleted(data.tasks.filter((t) => t.completed));
      }
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    setPending([]);
    setCompleted([]);
    fetchTasks();
  }, [groupId]);

  // 🟢 Add new task
  const handleAddTask = async () => {
    if (newTask.trim() === "") return;
    console.log("🟢 Adding new task with groupId:", groupId);

    try {
      const res = await fetch(`${backendUrl}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ task: newTask, groupId }),
      });

      const data = await res.json();
      if (res.ok && data.task) {
        console.log("✅ Task added successfully:", data.task);
        setNewTask("");
        await fetchTasks(); // 🟢 Refresh tasks after adding
      } else {
        console.error("❌ Error adding task:", data.message);
      }
    } catch (err) {
      console.error("❌ Error adding task:", err);
    }
  };

  // 🟢 Mark task as complete
  const handleComplete = async (index) => {
  const task = pending[index];
  console.log("🔍 Task being marked complete:", task);

  if (!task?._id) {
    console.error("❌ Invalid task ID");
    return;
  }

  try {
    const res = await fetch(`${backendUrl}/api/tasks/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        taskId: task._id,
        groupId: task.groupId || groupId,
      }),
    });

    const data = await res.json();

    if (!data.success || !res.ok) {
      console.error("❌ Error:", data?.message || "Failed to complete task");
      return;
    }

    console.log("✅ Task marked complete:", data.task);
    console.log("📈 Updated Progress:", data.progress);

    if(typeof onProgressUpdate === "function") onProgressUpdate(data.progress);

    await fetchTasks(); 
    await fetchProgress(); 
  } catch (error) {
    console.error("❌ Error marking task complete:", error);
  }
};


  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#D0C1A8]",
    secondary: isDark ? "bg-[#0F172A]" : "bg-[#a6987f]",
    button: isDark ? "bg-gray-900" : "bg-[#95775A]",
    textPrimary: isDark ? "text-white" : "text-gray-800",
    textMuted: isDark ? "text-gray-400" : "text-gray-900",
  };

  return (
    <div className={`${colors.textPrimary} p-6 w-full`}>
      <div className={`${colors.primary} rounded-2xl p-4 shadow-md`}>
        <h2 className="text-2xl font-semibold mb-4 text-center">To-Do List</h2>

        {/* Add Task Section */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className={`flex-1 px-4 py-2 rounded-lg border-none outline-none ${colors.secondary} ${colors.textPrimary}`}
          />
          <button
            onClick={handleAddTask}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${colors.button} text-white hover:opacity-90`}
          >
            <PlusCircle size={18} /> Add
          </button>
        </div>

        {/* To-do Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Completed Section */}
          <div className={`${colors.secondary} rounded-2xl p-4`}>
            <h3 className="text-2xl font-bold mb-3 text-center">Completed</h3>
            {completed.length === 0 ? (
              <p className={`${colors.textMuted} text-center`}>
                No completed tasks yet
              </p>
            ) : (
              completed.map((t, i) => (
                <div
                  key={t._id || i}
                  className={`${colors.primary} py-2 px-4 rounded-xl mb-2 flex justify-between items-center`}
                >
                  <span className="line-through">{t.task}</span>
                </div>
              ))
            )}
          </div>

          {/* Pending Section */}
          <div className={`${colors.secondary} rounded-2xl p-4`}>
            <h3 className="text-2xl font-bold mb-3 text-center">Pending</h3>
            {pending.length === 0 ? (
              <p className={`${colors.textMuted} text-center`}>No pending tasks</p>
            ) : (
              pending.map((t, i) => (
                <div
                  key={t._id || i}
                  className={`${colors.primary} py-2 px-4 rounded-xl mb-2 flex justify-between items-center`}
                >
                  <span>{t.task}</span>
                  <button
                    onClick={() => handleComplete(i)}
                    className="text-green-500 hover:text-green-300 transition-all"
                  >
                    <CheckCircle size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMemberToDo;
