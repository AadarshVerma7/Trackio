import mongoose from "mongoose";

const userTaskStatusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  completed: { type: Boolean, default: false },
});

export const UserTaskStatus = mongoose.model("UserTaskStatus", userTaskStatusSchema);
