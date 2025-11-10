import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  groupId: { type: String, required: true },
  task: { type: String, required: true },
});

export const Task = mongoose.model("Task", taskSchema);