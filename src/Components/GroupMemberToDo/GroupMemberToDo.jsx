import React, { useState } from 'react';

const GroupMemberToDo = () => {
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setPending([...pending, newTask.trim()]);
      setNewTask('');
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
    if (type === 'pending') setPending(pending.filter((t) => t !== task));
    else setCompleted(completed.filter((t) => t !== task));
  };

  return (
    <div className="text-black p-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 bg-[#d0c1a8] rounded-2xl p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">To - Do</h2>

          {/* Add Task Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task..."
              className="w-full border border-[#342f28f2] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#796149]
              placeholder-[#000000]"
            />
            <button
              onClick={handleAddTask}
              className="bg-[#95775a] hover:bg-[#796149] text-white px-5 rounded-xl font-semibold"
            >
              Add
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Completed Tasks */}
            <div className="bg-[#a39783] text-white rounded-2xl p-4 min-h-[280px] overflow-y-auto">
              <h3 className="text-4xl font-extrabold mb-3 text-center poppins">Completed</h3>
              <div className="space-y-3">
                {completed.length === 0 ? (
                  <p className="text-gray-700 text-center">No completed tasks yet</p>

                ) : (
                  completed.map((task, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 text-black py-2 px-4 rounded-xl flex justify-between items-center"
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
                          onClick={() => handleDeleteTask(task, 'completed')}
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
            <div className="bg-[#a39783] text-white rounded-2xl p-4 min-h-[380px] overflow-y-auto">
              <h3 className="text-4xl font-extrabold mb-3 text-center poppins">Pending</h3>
              <div className="space-y-3">
                {pending.length === 0 ? (
                  <p className="text-center text-gray-700">No pending tasks</p>
                ) : (
                  pending.map((task, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 text-black py-2 px-4 rounded-xl flex justify-between items-center"
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
                          onClick={() => handleDeleteTask(task, 'pending')}
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
