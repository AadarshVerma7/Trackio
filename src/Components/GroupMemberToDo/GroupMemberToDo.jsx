import React, { useState } from "react";

const GroupMemberToDo = ({ theme }) => {
  const isDark = theme === "dark";

  const colors = {
    primary: isDark ? "bg-[#272F40]" : "bg-[#D0C1A8]",
    secondary: isDark ? "bg-[#0F172A]" : "bg-[#a6987f]",
    accent: "from-orange-400 to-pink-500",
    button: isDark ? "bg-gray-900" : "bg-[#95775A]",
    textPrimary: isDark ? "text-white" : "text-gray-800",
    icons: isDark ? "invert-100" : "invert-0",
    shadow: isDark
      ? "shadow-[0_2px_5px_rgba(255,255,255,0.4)]"
      : "shadow-[0_2px_5px_rgba(0,0,0,0.1)]",
    input: isDark
      ? "bg-[#2B3447] text-white placeholder-gray-400"
      : "bg-white text-black placeholder-black",
    border: isDark ? "border-white/30" : "border-[#342f28f2]",
    textMuted: isDark ? "text-gray-400" : "text-gray-900",
    taskBox: isDark ? "bg-[#272F40] text-white" : "bg-gray-200 text-black",
    focusRing: isDark ? "focus:ring-white" : "focus:ring-[#796149]",
  };
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setPending([...pending, newTask.trim()]);
      setNewTask("");
    }
  };

  const handleCompleteTask = (task) => {
    setPending(pending.filter((t) => t !== task));
    setCompleted([...completed, task]);
  };

  const handleRevertTask = (task) => {
    setCompleted(completed.filter((t) => t !== task));
    setPending([...pending, task]);
  };

  const handleDeleteTask = (task, type) => {
    if (type === "pending") setPending(pending.filter((t) => t !== task));
    else setCompleted(completed.filter((t) => t !== task));
  };

  return (
    <div className={`${colors.textPrimary} p-6 w-full`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`lg:col-span-2 ${colors.primary} rounded-2xl p-4 shadow-md`}
        >
          <h2 className="text-2xl font-semibold mb-4">To - Do</h2>

          {/* Add Task Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task..."
              className={`w-full border border-[#342f28f2] ${colors.border} rounded-xl px-4 py-2 focus:outline-none focus:ring-2 ${colors.focusRing}
              ${colors.textMuted}`}
            />
            <button
              onClick={handleAddTask}
              className={` ${colors.button} text-white px-5 rounded-xl font-semibold hover:scale-[1.05] cursor-pointer`}
            >
              Add
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Completed Tasks */}
            <div
              className={`${colors.secondary} ${colors.textPrimary} rounded-2xl p-4 min-h-[280px] overflow-y-auto`}
            >
              <h3 className="text-4xl font-extrabold mb-3 text-center poppins">
                Completed
              </h3>
              <div className="space-y-3">
                {completed.length === 0 ? (
                  <p className={`${colors.textMuted} text-center`}>
                    No completed tasks yet
                  </p>
                ) : (
                  completed.map((task, index) => (
                    <div
                      key={index}
                      className={`${colors.primary} ${colors.textPrimary} ${colors.shadow} py-2 px-4 rounded-xl flex justify-between items-center`}
                    >
                      <span>{task}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRevertTask(task)}
                          className="text-orange-500 font-semibold"
                        >
                          ↩
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task, "completed")}
                          className="text-red-500 font-semibold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Pending Tasks */}
            <div
              className={`${colors.secondary} ${colors.textPrimary} rounded-2xl p-4 min-h-[380px] overflow-y-auto`}
            >
              <h3 className="text-4xl font-extrabold mb-3 text-center poppins">
                Pending
              </h3>
              <div className="space-y-3">
                {pending.length === 0 ? (
                  <p className={`text-center ${colors.textMuted}`}>
                    No pending tasks
                  </p>
                ) : (
                  pending.map((task, index) => (
                    <div
                      key={index}
                      className={`${colors.primary} ${colors.textPrimary} ${colors.shadow} py-2 px-4 rounded-xl flex justify-between items-center`}
                    >
                      <span>{task}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCompleteTask(task)}
                          className="text-green-600 font-semibold"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task, "pending")}
                          className="text-red-500 font-semibold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMemberToDo;
